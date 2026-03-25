CREATE TABLE country (
    code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE competition (
    id   VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE venue (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    city          VARCHAR(100),
    capacity      INT,
    _country_code VARCHAR(3) REFERENCES country(code)
);

CREATE TABLE team (
    id            SERIAL PRIMARY KEY,
    slug          VARCHAR(255) NOT NULL UNIQUE,
    name          VARCHAR(255) NOT NULL,
    official_name VARCHAR(255) NOT NULL,
    abbreviation  VARCHAR(3)      NOT NULL,
    founded_year  INT,
    _country_code VARCHAR(3) NOT NULL REFERENCES country(code)
);

CREATE TABLE stage (
    id       VARCHAR(100) PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    ordering INT          NOT NULL
);

CREATE TABLE group_table (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    _stage_id VARCHAR(100) NOT NULL REFERENCES stage(id)
);

CREATE TABLE event (
    id               SERIAL PRIMARY KEY,
    season           INT          NOT NULL,
    date_venue       DATE         NOT NULL,
    time_venue_utc   TIME,
    status           VARCHAR(50)  NOT NULL,
    _competition_id  VARCHAR(100) NOT NULL REFERENCES competition(id),
    _stage_id        VARCHAR(100) NOT NULL REFERENCES stage(id),
    _group_id        INT          REFERENCES group_table(id),
    _home_team_id    INT          REFERENCES team(id),
    _away_team_id    INT          REFERENCES team(id),
    _venue_id        INT          REFERENCES venue(id)
);

CREATE TABLE event_stage_position (
    id             SERIAL PRIMARY KEY,
    _event_id      INT NOT NULL REFERENCES event(id),
    _team_id       INT NOT NULL REFERENCES team(id),
    stage_position INT
);

CREATE TABLE result (
    id               SERIAL PRIMARY KEY,
    _event_id        INT UNIQUE NOT NULL REFERENCES event(id),
    _winner_team_id  INT        REFERENCES team(id),
    message          VARCHAR(255)
);

CREATE TABLE goal_event (
    id          SERIAL PRIMARY KEY,
    _result_id  INT NOT NULL REFERENCES result(id),
    _team_id    INT REFERENCES team(id),
    player_name VARCHAR(255),
    minute      INT,
    goal_type   VARCHAR(50)
);

CREATE TABLE card_event (
    id          SERIAL PRIMARY KEY,
    _result_id  INT NOT NULL REFERENCES result(id),
    _team_id    INT REFERENCES team(id),
    player_name VARCHAR(255),
    minute      INT,
    card_type   VARCHAR(50) NOT NULL
);