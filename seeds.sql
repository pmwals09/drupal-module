DELETE FROM day_responses;
DELETE FROM submission_day;
DELETE FROM submission_month;
DELETE FROM submission_year;
DELETE FROM submission_total;
INSERT INTO day_responses (day,month,year,location,question,answer) 
VALUES ('24','2','2023','nmnh', 'resources.poundsCo2','A'),
('24','2','2023','nmnh', 'resources.poundsCo2','B'),
('24','2','2023','nmnh', 'resources.poundsCo2','C'),
('24','2','2023','nmnh', 'resources.poundsCo2','D'),

('24','2','2023','nmnh', 'resources.fairTrade','A'),
('24','2','2023','nmnh', 'resources.fairTrade','B'),
('24','2','2023','nmnh', 'resources.fairTrade','C'),
('24','2','2023','nmnh', 'resources.fairTrade','D'),

('24','2','2023','nmnh', 'resources.howOftenNew','A'),
('24','2','2023','nmnh', 'resources.howOftenNew','B'),
('24','2','2023','nmnh', 'resources.howOftenNew','C'),
('24','2','2023','nmnh', 'resources.howOftenNew','D'),
('24','2','2023','nmnh', 'resources.howOftenNew','E'),

('24','2','2023','nmnh', 'resources.whatMakesGetNew','A'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','B'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','C'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','D'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','E'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','F'),

('24','2','2023','nmnh', 'infrastructure.infraFacts','A'),
('24','2','2023','nmnh', 'infrastructure.infraFacts','B'),
('24','2','2023','nmnh', 'infrastructure.infraFacts','C'),
('24','2','2023','nmnh', 'infrastructure.infraFacts','D');


INSERT INTO all_responses (day,month,year,location,question,answer) 
VALUES ('24','2','2023','nmnh', 'resources.poundsCo2','A'),
('24','2','2023','nmnh', 'resources.poundsCo2','B'),
('24','2','2023','nmnh', 'resources.poundsCo2','C'),
('24','2','2023','nmnh', 'resources.poundsCo2','D'),

('24','2','2023','nmnh', 'resources.fairTrade','A'),
('24','2','2023','nmnh', 'resources.fairTrade','B'),
('24','2','2023','nmnh', 'resources.fairTrade','C'),
('24','2','2023','nmnh', 'resources.fairTrade','D'),

('24','2','2023','nmnh', 'resources.howOftenNew','A'),
('24','2','2023','nmnh', 'resources.howOftenNew','B'),
('24','2','2023','nmnh', 'resources.howOftenNew','C'),
('24','2','2023','nmnh', 'resources.howOftenNew','D'),
('24','2','2023','nmnh', 'resources.howOftenNew','E'),

('24','2','2023','nmnh', 'resources.whatMakesGetNew','A'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','B'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','C'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','D'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','E'),
('24','2','2023','nmnh', 'resources.whatMakesGetNew','F'),

('24','2','2023','nmnh', 'infrastructure.infraFacts','A'),
('24','2','2023','nmnh', 'infrastructure.infraFacts','B'),
('24','2','2023','nmnh', 'infrastructure.infraFacts','C'),
('24','2','2023','nmnh', 'infrastructure.infraFacts','D');

INSERT INTO submission_total (location, question, answer, answer_count)
VALUES ('nmnh','resources.poundsCo2','A',1),
('nmnh','resources.poundsCo2','B',1),
('nmnh','resources.poundsCo2','C',1),
('nmnh','resources.poundsCo2','D',1),

('nmnh','resources.fairTrade','A',1),
('nmnh','resources.fairTrade','B',1),
('nmnh','resources.fairTrade','C',1),
('nmnh','resources.fairTrade','D',1),

('nmnh','resources.howOftenNew','A',1),
('nmnh','resources.howOftenNew','B',1),
('nmnh','resources.howOftenNew','C',1),
('nmnh','resources.howOftenNew','D',1),
('nmnh','resources.howOftenNew','E',1),

('nmnh','resources.whatMakesGetNew','A',1),
('nmnh','resources.whatMakesGetNew','B',1),
('nmnh','resources.whatMakesGetNew','C',1),
('nmnh','resources.whatMakesGetNew','D',1),
('nmnh','resources.whatMakesGetNew','E',1),
('nmnh','resources.whatMakesGetNew','F',1),

('nmnh','infrastructure.infraFacts','A',1),
('nmnh','infrastructure.infraFacts','B',1),
('nmnh','infrastructure.infraFacts','C',1),
('nmnh','infrastructure.infraFacts','D',1);
