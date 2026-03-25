package com.sportradar.events.service;

import com.sportradar.events.entity.Event;
import com.sportradar.events.entity.Team;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import com.sportradar.events.repository.EventRepository;
import com.sportradar.events.repository.CompetitionRepository;
import com.sportradar.events.repository.StageRepository;
import com.sportradar.events.repository.GroupTableRepository;
import com.sportradar.events.repository.TeamRepository;
import com.sportradar.events.repository.VenueRepository;
import com.sportradar.events.repository.ResultRepository;
import com.sportradar.events.repository.GoalEventRepository;
import com.sportradar.events.repository.CardEventRepository;
import com.sportradar.events.dto.EventResponseDto;
import com.sportradar.events.dto.EventDetailResponseDto;
import com.sportradar.events.dto.CreateEventRequestDto;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final CompetitionRepository competitionRepository;
    private final StageRepository stageRepository;
    private final GroupTableRepository groupTableRepository;
    private final TeamRepository teamRepository;
    private final VenueRepository venueRepository;
    private final ResultRepository resultRepository;
    private final GoalEventRepository goalEventRepository;
    private final CardEventRepository cardEventRepository;

    public List<EventResponseDto> getAllEvents(
            String competitionId,
            Integer teamId,
            String status,
            String sortDate) {

        Specification<Event> spec = buildSpec(competitionId, teamId, status);
        Sort sort = Sort.by(
            "desc".equalsIgnoreCase(sortDate) ? Sort.Direction.DESC : Sort.Direction.ASC,
            "dateVenue"
        );

        return eventRepository.findAll(spec, sort)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public EventDetailResponseDto getEventDetail(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        EventDetailResponseDto dto = new EventDetailResponseDto();
        dto.setId(event.getId());
        dto.setSeason(event.getSeason());
        dto.setDateVenue(event.getDateVenue());
        dto.setTimeVenueUtc(event.getTimeVenueUtc());
        dto.setStatus(event.getStatus());
        dto.setCompetitionId(event.getCompetition().getId());
        dto.setCompetitionName(event.getCompetition().getName());
        dto.setStageId(event.getStage().getId());
        dto.setStageName(event.getStage().getName());

        if (event.getHomeTeam() != null) dto.setHomeTeam(toDetailTeamDto(event.getHomeTeam()));
        if (event.getAwayTeam() != null) dto.setAwayTeam(toDetailTeamDto(event.getAwayTeam()));

        if (event.getVenue() != null) {
            dto.setVenueName(event.getVenue().getName());
            dto.setVenueCity(event.getVenue().getCity());
            dto.setVenueCapacity(event.getVenue().getCapacity());
            if (event.getVenue().getCountry() != null)
                dto.setVenueCountry(event.getVenue().getCountry().getName());
        }

        resultRepository.findByEventId(id).ifPresent(result -> {
            var goals = goalEventRepository.findByResultIdWithTeam(result.getId());
            var cards = cardEventRepository.findByResultIdWithTeam(result.getId());

            Integer homeTeamId = event.getHomeTeam() != null ? event.getHomeTeam().getId() : null;
            Integer awayTeamId = event.getAwayTeam() != null ? event.getAwayTeam().getId() : null;

            int homeScore = (int) goals.stream()
                    .filter(g -> g.getTeam() != null && g.getTeam().getId().equals(homeTeamId))
                    .count();
            int awayScore = (int) goals.stream()
                    .filter(g -> g.getTeam() != null && g.getTeam().getId().equals(awayTeamId))
                    .count();

            EventDetailResponseDto.ResultDto resultDto = new EventDetailResponseDto.ResultDto();
            if (result.getWinnerTeam() != null) {
                resultDto.setWinnerTeamId(result.getWinnerTeam().getId());
                resultDto.setWinnerTeamName(result.getWinnerTeam().getName());
            }
            resultDto.setMessage(result.getMessage());
            resultDto.setHomeScore(homeScore);
            resultDto.setAwayScore(awayScore);

            resultDto.setGoals(goals.stream().map(g -> {
                EventDetailResponseDto.GoalDto gdto = new EventDetailResponseDto.GoalDto();
                if (g.getTeam() != null) {
                    gdto.setTeamId(g.getTeam().getId());
                    gdto.setTeamName(g.getTeam().getName());
                }
                gdto.setPlayerName(g.getPlayerName());
                gdto.setMinute(g.getMinute());
                gdto.setGoalType(g.getGoalType());
                return gdto;
            }).toList());

            resultDto.setCards(cards.stream().map(c -> {
                EventDetailResponseDto.CardDto cdto = new EventDetailResponseDto.CardDto();
                if (c.getTeam() != null) {
                    cdto.setTeamId(c.getTeam().getId());
                    cdto.setTeamName(c.getTeam().getName());
                }
                cdto.setPlayerName(c.getPlayerName());
                cdto.setMinute(c.getMinute());
                cdto.setCardType(c.getCardType());
                return cdto;
            }).toList());

            dto.setResult(resultDto);
        });

        return dto;
    }

    public EventResponseDto createEvent(CreateEventRequestDto req) {
        Event event = new Event();
        event.setSeason(req.getSeason());
        event.setDateVenue(req.getDateVenue());
        event.setTimeVenueUtc(req.getTimeVenueUtc());
        event.setStatus(req.getStatus());

        event.setCompetition(competitionRepository.findById(req.getCompetitionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Competition not found")));
        event.setStage(stageRepository.findById(req.getStageId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stage not found")));

        if (req.getGroupId() != null)
            event.setGroup(groupTableRepository.findById(req.getGroupId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found")));
        if (req.getHomeTeamId() != null)
            event.setHomeTeam(teamRepository.findById(req.getHomeTeamId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Home team not found")));
        if (req.getAwayTeamId() != null)
            event.setAwayTeam(teamRepository.findById(req.getAwayTeamId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Away team not found")));
        if (req.getVenueId() != null)
            event.setVenue(venueRepository.findById(req.getVenueId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Venue not found")));

        return toDto(eventRepository.save(event));
    }

    private Specification<Event> buildSpec(String competitionId, Integer teamId, String status) {
        return (root, query, cb) -> {
            query.distinct(true);
            List<Predicate> predicates = new ArrayList<>();

            if (competitionId != null && !competitionId.isBlank())
                predicates.add(cb.equal(root.get("competition").get("id"), competitionId));

            if (status != null && !status.isBlank())
                predicates.add(cb.equal(root.get("status"), status));

            if (teamId != null) {
                var homeJoin = root.join("homeTeam", JoinType.LEFT);
                var awayJoin = root.join("awayTeam", JoinType.LEFT);
                predicates.add(cb.or(
                    cb.equal(homeJoin.get("id"), teamId),
                    cb.equal(awayJoin.get("id"), teamId)
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private EventResponseDto toDto(Event e) {
        EventResponseDto dto = new EventResponseDto();
        dto.setId(e.getId());
        dto.setSeason(e.getSeason());
        dto.setDateVenue(e.getDateVenue());
        dto.setTimeVenueUtc(e.getTimeVenueUtc());
        dto.setStatus(e.getStatus());
        dto.setCompetitionId(e.getCompetition().getId());
        dto.setCompetitionName(e.getCompetition().getName());
        dto.setStageId(e.getStage().getId());
        dto.setStageName(e.getStage().getName());
        if (e.getVenue() != null) {
            dto.setVenueName(e.getVenue().getName());
            dto.setVenueCity(e.getVenue().getCity());
        }
        if (e.getHomeTeam() != null) dto.setHomeTeam(toTeamDto(e.getHomeTeam()));
        if (e.getAwayTeam() != null) dto.setAwayTeam(toTeamDto(e.getAwayTeam()));
        return dto;
    }

    private EventResponseDto.TeamDto toTeamDto(Team t) {
        EventResponseDto.TeamDto dto = new EventResponseDto.TeamDto();
        dto.setId(t.getId());
        dto.setName(t.getName());
        dto.setOfficialName(t.getOfficialName());
        dto.setAbbreviation(t.getAbbreviation());
        dto.setCountryCode(t.getCountry().getCode());
        return dto;
    }

    private EventDetailResponseDto.TeamDto toDetailTeamDto(Team t) {
        EventDetailResponseDto.TeamDto dto = new EventDetailResponseDto.TeamDto();
        dto.setId(t.getId());
        dto.setName(t.getName());
        dto.setOfficialName(t.getOfficialName());
        dto.setAbbreviation(t.getAbbreviation());
        dto.setCountryCode(t.getCountry().getCode());
        return dto;
    }
}
