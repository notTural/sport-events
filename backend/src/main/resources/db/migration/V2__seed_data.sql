-- ════════════════════════════════════════════════════════════
-- REFERENCE DATA
-- ════════════════════════════════════════════════════════════

INSERT INTO country (code, name) VALUES
('KSA', 'Saudi Arabia'),
('UZB', 'Uzbekistan'),
('UAE', 'United Arab Emirates'),
('QAT', 'Qatar'),
('IRN', 'Iran'),
('JPN', 'Japan'),
('KOR', 'South Korea'),
('CHN', 'China'),
('AUS', 'Australia');

INSERT INTO competition (id, name) VALUES
('afc-champions-league', 'AFC Champions League'),
('saudi-pro-league',     'Saudi Pro League'),
('j-league',             'J.League Division 1');

INSERT INTO stage (id, name, ordering) VALUES
('GROUP_STAGE', 'Group Stage',  1),
('ROUND_OF_32', 'Round of 32', 3),
('ROUND OF 16', 'Round of 16', 4),
('QUARTER FINAL','Quarter Final',5),
('SEMI FINAL',   'Semi Final',  6),
('FINAL',        'Final',       7);

INSERT INTO team (slug, name, official_name, abbreviation, founded_year, _country_code) VALUES
('al-shabab-fc',        'Al Shabab',       'Al Shabab FC',          'SHA', 1947, 'KSA'),
('fc-nasaf-qarshi',     'Nasaf',           'FC Nasaf',              'NAS', 1977, 'UZB'),
('al-hilal-saudi-fc',  'Al Hilal',        'Al Hilal Saudi FC',     'HIL', 1957, 'KSA'),
('shabab-al-ahli-club','Shabab Al Ahli',  'SHABAB AL AHLI DUBAI',  'SAH', 1992, 'UAE'),
('al-duhail-sc',       'Al Duhail',       'AL DUHAIL SC',          'DUH', 1996, 'QAT'),
('al-rayyan-sc',       'Al Rayyan',       'AL RAYYAN SC',          'RYN', 1959, 'QAT'),
('al-faisaly-fc',      'Al Faisaly',      'Al Faisaly FC',         'FAI', 1958, 'KSA'),
('foolad-khuzestan-fc','Foolad',          'FOOLAD KHOUZESTAN FC',  'FLD', 1971, 'IRN'),
('urawa-red-diamonds', 'Urawa Reds',      'Urawa Red Diamonds',    'RED', 1950, 'JPN'),
('pohang-steelers',    'Pohang Steelers', 'Pohang Steelers FC',    'POH', 1973, 'KOR'),
('shanghai-port-fc',   'Shanghai Port',   'Shanghai Port FC',       'SHP', 1994, 'CHN'),
('sydney-fc',          'Sydney FC',       'Sydney Football Club',   'SYD', 2004, 'AUS');

INSERT INTO venue (name, city, capacity, _country_code) VALUES
('King Fahd International Stadium', 'Riyadh',   68752, 'KSA'),
('King Abdullah Sports City',       'Jeddah',   62345, 'KSA'),
('Saitama Stadium 2002',            'Saitama',  63700, 'JPN'),
('Bunyodkor Stadium',               'Tashkent', 34000, 'UZB'),
('Pohang Steel Yard',               NULL,       NULL,  'KOR'),
('Community Training Ground',       NULL,       NULL,  NULL);

INSERT INTO group_table (name, _stage_id) VALUES
('Group A', 'GROUP_STAGE'),
('Group B', 'GROUP_STAGE');

-- ════════════════════════════════════════════════════════════
-- EVENTS  (7 played · 1 cancelled · 1 scheduled)
-- ════════════════════════════════════════════════════════════

-- [ACL-R16] Al Shabab 1–2 Nasaf · played · no venue
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id)
VALUES (2024, '2024-01-03', '00:00:00', 'played', 'afc-champions-league', 'ROUND OF 16',
    (SELECT id FROM team WHERE slug = 'al-shabab-fc'),
    (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'));

-- [SPL-1] Al Hilal 3–1 Al Faisaly · played · venue
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id, _venue_id)
VALUES (2024, '2024-08-16', '17:00:00', 'played', 'saudi-pro-league', 'GROUP_STAGE',
    (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'),
    (SELECT id FROM team WHERE slug = 'al-faisaly-fc'),
    (SELECT id FROM venue WHERE name = 'King Fahd International Stadium'));

-- [SPL-2] Al Shabab 1–1 Al Rayyan · played · venue · draw
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id, _venue_id)
VALUES (2024, '2024-08-17', '19:00:00', 'played', 'saudi-pro-league', 'GROUP_STAGE',
    (SELECT id FROM team WHERE slug = 'al-shabab-fc'),
    (SELECT id FROM team WHERE slug = 'al-rayyan-sc'),
    (SELECT id FROM venue WHERE name = 'King Abdullah Sports City'));

-- [SPL-3] Al Duhail vs Foolad · CANCELLED · no venue
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id)
VALUES (2024, '2024-08-23', '18:00:00', 'cancelled', 'saudi-pro-league', 'GROUP_STAGE',
    (SELECT id FROM team WHERE slug = 'al-duhail-sc'),
    (SELECT id FROM team WHERE slug = 'foolad-khuzestan-fc'));

-- [ACL-GS-1] Al Hilal 2–0 Urawa · played · Group A · venue
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _group_id, _home_team_id, _away_team_id, _venue_id)
VALUES (2024, '2024-09-17', '15:00:00', 'played', 'afc-champions-league', 'GROUP_STAGE',
    (SELECT id FROM group_table WHERE name = 'Group A'),
    (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'),
    (SELECT id FROM team WHERE slug = 'urawa-red-diamonds'),
    (SELECT id FROM venue WHERE name = 'King Fahd International Stadium'));

-- [ACL-GS-2] Nasaf 1–0 Shabab Al Ahli · played · Group B · venue
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _group_id, _home_team_id, _away_team_id, _venue_id)
VALUES (2024, '2024-09-18', '12:00:00', 'played', 'afc-champions-league', 'GROUP_STAGE',
    (SELECT id FROM group_table WHERE name = 'Group B'),
    (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'),
    (SELECT id FROM team WHERE slug = 'shabab-al-ahli-club'),
    (SELECT id FROM venue WHERE name = 'Bunyodkor Stadium'));

-- [ACL-R32] Pohang 3–2 Shanghai · played · venue (no city/capacity)
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id, _venue_id)
VALUES (2024, '2024-10-03', '10:00:00', 'played', 'afc-champions-league', 'ROUND_OF_32',
    (SELECT id FROM team WHERE slug = 'pohang-steelers'),
    (SELECT id FROM team WHERE slug = 'shanghai-port-fc'),
    (SELECT id FROM venue WHERE name = 'Pohang Steel Yard'));

-- [ACL-QF] Nasaf 2–1 Al Hilal · played · venue · result with message
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id, _venue_id)
VALUES (2024, '2024-11-05', '14:00:00', 'played', 'afc-champions-league', 'QUARTER FINAL',
    (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'),
    (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'),
    (SELECT id FROM venue WHERE name = 'Bunyodkor Stadium'));

-- [SPL-FINAL] TBD vs TBD · SCHEDULED · no teams · no venue · no time
INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id)
VALUES (2025, '2025-05-17', NULL, 'scheduled', 'saudi-pro-league', 'FINAL', NULL, NULL);

-- ════════════════════════════════════════════════════════════
-- RESULTS
-- ════════════════════════════════════════════════════════════

INSERT INTO result (_event_id, _winner_team_id)
VALUES ((SELECT e.id FROM event e WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-01-03'),
        (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'));

INSERT INTO result (_event_id, _winner_team_id)
VALUES ((SELECT e.id FROM event e WHERE e._competition_id = 'saudi-pro-league'     AND e.date_venue = '2024-08-16'),
        (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'));

INSERT INTO result (_event_id, _winner_team_id)
VALUES ((SELECT e.id FROM event e WHERE e._competition_id = 'saudi-pro-league'     AND e.date_venue = '2024-08-17'),
        NULL);  -- draw

INSERT INTO result (_event_id, _winner_team_id)
VALUES ((SELECT e.id FROM event e WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-09-17'),
        (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'));

INSERT INTO result (_event_id, _winner_team_id)
VALUES ((SELECT e.id FROM event e WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-09-18'),
        (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'));

INSERT INTO result (_event_id, _winner_team_id)
VALUES ((SELECT e.id FROM event e WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03'),
        (SELECT id FROM team WHERE slug = 'pohang-steelers'));

INSERT INTO result (_event_id, _winner_team_id, message)
VALUES ((SELECT e.id FROM event e WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-11-05'),
        (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'),
        'Historic upset — Nasaf advances to the Semi Finals');

-- ════════════════════════════════════════════════════════════
-- GOALS
-- ════════════════════════════════════════════════════════════

-- [ACL-R16] Al Shabab 1–2 Nasaf
-- Nasaf: normal 23', penalty 67'  |  Shabab: normal 44'
INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Kholmatov', 23, 'normal'
FROM result r JOIN event e ON r._event_id = e.id
WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-01-03';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-shabab-fc'), 'Abdullah Al Zori', 44, 'normal'
FROM result r JOIN event e ON r._event_id = e.id
WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-01-03';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Jaloliddin Masharipov', 67, 'penalty'
FROM result r JOIN event e ON r._event_id = e.id
WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-01-03';

-- [SPL-1] Al Hilal 3–1 Al Faisaly
-- Hilal: normal 23', penalty 61', normal 87'  |  Faisaly: normal 38'
INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Aleksandar Mitrovic', 23, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-16';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-faisaly-fc'), 'Omar Al Somah', 38, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-16';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Salem Al-Dawsari', 61, 'penalty'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-16';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Ruben Neves', 87, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-16';

-- [SPL-2] Al Shabab 1–1 Al Rayyan (draw)
-- Shabab: normal 15'  |  Rayyan: penalty 72'
INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-shabab-fc'), 'Ahmed Al Ghamdi', 15, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-17';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-rayyan-sc'), 'Yacine Brahimi', 72, 'penalty'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-17';

-- [ACL-GS-1] Al Hilal 2–0 Urawa
-- Hilal: normal 34', normal 78'
INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Aleksandar Mitrovic', 34, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-09-17';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Malcom', 78, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-09-17';

-- [ACL-GS-2] Nasaf 1–0 Shabab Al Ahli
-- Nasaf: normal 58'
INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Kholmatov', 58, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-09-18';

-- [ACL-R32] Pohang 3–2 Shanghai
-- Pohang: normal 12', penalty 45', normal 82'  |  Shanghai: normal 29', normal 67'
INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'pohang-steelers'), 'Lee Seung-mo', 12, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'shanghai-port-fc'), 'Zhang Wei', 29, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'pohang-steelers'), 'Kim Min-jun', 45, 'penalty'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'shanghai-port-fc'), 'Li Ang', 67, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'pohang-steelers'), 'Choi Bum-keun', 82, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03';

-- [ACL-QF] Nasaf 2–1 Al Hilal
-- Nasaf: normal 22', own_goal 78' (Al-Dawsari OG – stored under Nasaf as benefiting team)
-- Hilal: normal 55'
INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Kholmatov', 22, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-11-05';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Aleksandar Mitrovic', 55, 'normal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-11-05';

INSERT INTO goal_event (_result_id, _team_id, player_name, minute, goal_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Salem Al-Dawsari', 78, 'own_goal'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-11-05';

-- ════════════════════════════════════════════════════════════
-- CARDS
-- ════════════════════════════════════════════════════════════

-- [ACL-R16] Al Shabab 1–2 Nasaf
-- Shabab: yellow 31'  |  Nasaf: yellow 52'
INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-shabab-fc'), 'Marwan Al Shalhoub', 31, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id
WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-01-03';

INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Utkir Yusupov', 52, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id
WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-01-03';

-- [SPL-1] Al Hilal 3–1 Al Faisaly
-- Faisaly: yellow 41', yellow 74'  |  Hilal: yellow 88'
INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-faisaly-fc'), 'Khalid Al Ghannam', 41, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-16';

INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-faisaly-fc'), 'Ahmed Sharahili', 74, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-16';

INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Kalidou Koulibaly', 88, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-16';

-- [SPL-2] Al Shabab 1–1 Al Rayyan
-- Rayyan: yellow 55'
INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-rayyan-sc'), 'Boualem Khoukhi', 55, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'saudi-pro-league' AND e.date_venue = '2024-08-17';

-- [ACL-GS-1] Al Hilal 2–0 Urawa
-- Urawa: yellow 55'
INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'urawa-red-diamonds'), 'Hiroki Ito', 55, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-09-17';

-- [ACL-GS-2] Nasaf 1–0 Shabab Al Ahli
-- Nasaf: yellow 33'
INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Odil Ahmedov', 33, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-09-18';

-- [ACL-R32] Pohang 3–2 Shanghai
-- Shanghai: yellow 36', red 71'
INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'shanghai-port-fc'), 'Wu Lei', 36, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03';

INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'shanghai-port-fc'), 'Zhang Linpeng', 71, 'red'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-10-03';

-- [ACL-QF] Nasaf 2–1 Al Hilal
-- Nasaf: yellow 33'  |  Hilal: yellow 62', yellow_red 85'
INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi'), 'Jaloliddin Masharipov', 33, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-11-05';

INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Ruben Neves', 62, 'yellow'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-11-05';

INSERT INTO card_event (_result_id, _team_id, player_name, minute, card_type)
SELECT r.id, (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'), 'Ruben Neves', 85, 'yellow_red'
FROM result r JOIN event e ON r._event_id = e.id WHERE e._competition_id = 'afc-champions-league' AND e.date_venue = '2024-11-05';
