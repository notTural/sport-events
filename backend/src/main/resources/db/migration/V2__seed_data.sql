INSERT INTO country (code, name) VALUES
('KSA', 'Saudi Arabia'),
('UZB', 'Uzbekistan'),
('UAE', 'United Arab Emirates'),
('QAT', 'Qatar'),
('IRN', 'Iran'),
('JPN', 'Japan');

INSERT INTO competition (id, name) VALUES
('afc-champions-league', 'AFC Champions League');

INSERT INTO stage (id, name, ordering) VALUES
('ROUND OF 16', 'Round of 16', 4),
('QUARTER FINAL', 'Quarter Final', 5),
('SEMI FINAL', 'Semi Final', 6),
('FINAL', 'Final', 7);

INSERT INTO team (slug, name, official_name, abbreviation, _country_code) VALUES
('al-shabab-fc',        'Al Shabab',      'Al Shabab FC',            'SHA', 'KSA'),
('fc-nasaf-qarshi',     'Nasaf',          'FC Nasaf',                'NAS', 'UZB'),
('al-hilal-saudi-fc',  'Al Hilal',       'Al Hilal Saudi FC',       'HIL', 'KSA'),
('shabab-al-ahli-club','Shabab Al Ahli', 'SHABAB AL AHLI DUBAI',    'SAH', 'UAE'),
('al-duhail-sc',       'Al Duhail',      'AL DUHAIL SC',            'DUH', 'QAT'),
('al-rayyan-sc',       'Al Rayyan',      'AL RAYYAN SC',            'RYN', 'QAT'),
('al-faisaly-fc',      'Al Faisaly',     'Al Faisaly FC',           'FAI', 'KSA'),
('foolad-khuzestan-fc','Foolad',         'FOOLAD KHOUZESTAN FC',    'FLD', 'IRN'),
('urawa-red-diamonds', 'Urawa Reds',     'Urawa Red Diamonds',      'RED', 'JPN');

INSERT INTO event (season, date_venue, time_venue_utc, status, _competition_id, _stage_id, _home_team_id, _away_team_id)
VALUES
(2024, '2024-01-03', '00:00:00', 'played',    'afc-champions-league', 'ROUND OF 16',
    (SELECT id FROM team WHERE slug = 'al-shabab-fc'),
    (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi')),

(2024, '2024-01-03', '16:00:00', 'scheduled', 'afc-champions-league', 'ROUND OF 16',
    (SELECT id FROM team WHERE slug = 'al-hilal-saudi-fc'),
    (SELECT id FROM team WHERE slug = 'shabab-al-ahli-club')),

(2024, '2024-01-04', '15:25:00', 'scheduled', 'afc-champions-league', 'ROUND OF 16',
    (SELECT id FROM team WHERE slug = 'al-duhail-sc'),
    (SELECT id FROM team WHERE slug = 'al-rayyan-sc')),

(2024, '2024-01-04', '08:00:00', 'scheduled', 'afc-champions-league', 'ROUND OF 16',
    (SELECT id FROM team WHERE slug = 'al-faisaly-fc'),
    (SELECT id FROM team WHERE slug = 'foolad-khuzestan-fc')),

(2024, '2024-01-19', '00:00:00', 'scheduled', 'afc-champions-league', 'FINAL',
    NULL,
    (SELECT id FROM team WHERE slug = 'urawa-red-diamonds'));

INSERT INTO result (_event_id, _winner_team_id)
VALUES (
    (SELECT id FROM event WHERE date_venue = '2024-01-03' AND _home_team_id = (SELECT id FROM team WHERE slug = 'al-shabab-fc')),
    (SELECT id FROM team WHERE slug = 'fc-nasaf-qarshi')
);