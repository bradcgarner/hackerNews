-- drop database if exists newsTestDb;
drop table if exists news;
drop table if exists author;
drop table if exists tags;
drop table if exists news_tags;

-- CREATE DATABASE newsTestDb;

CREATE TABLE news (
  title text,
  id serial primary key,
  url text,
  votes integer default 0,
  id_author integer
);

CREATE TABLE author (
  name_first text,
  name_last text,
  id serial primary key
);

CREATE TABLE tags (
  name text,
  id serial primary key
);

CREATE TABLE news_tags (
  id serial primary key,
  id_news integer references news on delete cascade,
  id_tags integer references tags on delete cascade
);

INSERT into news 
(title, url, votes, id_author) 
VALUES
('myarticle1', 'http://www.news.com', 0, 1), 
('myarticle2', 'http://www.news.com', 0, 2), 
('myarticle3', 'http://www.news.com', 3, 3), 
('myarticle4', 'http://www.news.com', 6, 4), 
('myarticle5', 'http://www.news.com', 3, 5), 
('myarticle6', 'http://www.news.com', 2, 6), 
('myarticle7', 'http://www.news.com', 0, 7), 
('myarticle8', 'http://www.news.com', 0, 8), 
('myarticle9', 'http://www.news.com', 0, 9), 
('myarticle10', 'http://www.news.com', 3, 1), 
('myarticle11', 'http://www.news.com', 88, 2), 
('myarticle12', 'http://www.news.com', 4, 7), 
('myarticle13', 'http://www.news.com', 2, 6), 
('myarticle14', 'http://www.news.com', 1, 2), 
('myarticle15', 'http://www.news.com', 0, 1);

INSERT into author 
(name_first, name_last) 
VALUES
('Bob', 'Smith'), 
('Bobe', 'Smith'), 
('Boob', 'Smith'), 
('Fob', 'Smith'), 
('Rob', 'Smith'), 
('Lob', 'Smith'), 
('Bobb', 'Smith'), 
('Babe', 'Smith'), 
('Fob', 'Smith'), 
('Rube', 'Smith'), 
('Zob', 'Smith');

INSERT into tags 
(name) 
VALUES
('Tag'), ('Zag'), ('Wag'), ('Rag'), ('Lag'), ('Bag'),
('Gag'), ('Ag'), ('Tag2'), ('Zig'), ('Fig'), ('Twelve');

--news (15), tags(12)
INSERT into news_tags 
(id_news, id_tags) 
VALUES
(1, 2),(2, 12),(5, 10),(6, 7),(8, 8),(11, 6),
(1, 9),(3, 11),(7, 2),(15, 4),(13, 1),(12, 5),
(1, 4),(1, 5), (2, 10);