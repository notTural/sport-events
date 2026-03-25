```mermaid
erDiagram

  competition ||--o{ event : ""
  country ||--o{ team : ""
  country ||--o{ venue : ""
  stage ||--o{ event : ""
  stage ||--o{ group_table : ""
  group_table |o--o{ event : ""
  team |o--o{ event : ""
  team |o--o{ event : ""
  venue |o--o{ event : ""
  event ||--o{ event_stage_position : ""
  team ||--o{ event_stage_position : ""
  event |o--|| result : ""
  result ||--o{ goal_event : ""
  result ||--o{ card_event : ""
  team |o--o{ goal_event : ""
  team |o--o{ card_event : ""
  team |o--o{ result : ""

 competition {
    varchar id PK
    varchar name
  }

  country {
    char code PK
    varchar name
  }

  venue {
    int id PK
    varchar name
    varchar city
    int capacity
    char _country_code FK
  }

  team {
    int id PK
    varchar slug UK
    varchar name
    varchar official_name
    char abbreviation
    int founded_year
    char _country_code FK
  }

  stage {
    varchar id PK
    varchar name
    int ordering
  }

  group_table {
    int id PK
    varchar name
    varchar _stage_id FK
  }

  event {
    int id PK
    int season
    date date_venue
    time time_venue_utc
    varchar status
    varchar _competition_id FK
    varchar _stage_id FK
    int _group_id FK
    int _home_team_id FK
    int _away_team_id FK
    int _venue_id FK
  }

  event_stage_position {
    int id PK
    int _event_id FK
    int _team_id FK
    int stage_position
  }

  result {
    int id PK
    int _event_id FK
    int _winner_team_id FK
    varchar message
  }

  goal_event {
    int id PK
    int _result_id FK
    int _team_id FK
    varchar player_name
    int minute
    varchar goal_type
  }

  card_event {
    int id PK
    int _result_id FK
    int _team_id FK
    varchar player_name
    int minute
    varchar card_type
  }
```



## Why `result` stores `_winner_team_id` directly

In most cases the winner can be inferred from goal counts, but goals alone are not always enough. Matches can be decided by penalty shootouts, walkovers, or administrative decisions where no goals are recorded. Storing `_winner_team_id` as an explicit field captures these outcomes without requiring special-case logic in every query that asks who won.

The `message` column exists for the same reason. It holds a note for any result that cannot be expressed through goals alone.