DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id DECIMAL(65) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  openId VARCHAR(255) NULL,
  defaultColor CHAR(7) NOT NULL
);
INSERT INTO users (id, name, openId, defaultColor) VALUES (0, 'Demo user', NULL, '#FF0000');

DROP TABLE IF EXISTS tiles;
CREATE TABLE tiles (
  id DECIMAL(65) PRIMARY KEY,
  col DECIMAL(65) NOT NULL,
  row DECIMAL(65) NOT NULL,
  layerId TINYINT NOT NULL,
  currentFingerPrintId DECIMAL(65) NULL,
  UNIQUE (col, row, layerId)
);
INSERT INTO tiles (id, col, row, layerId, currentFingerPrintId) VALUES (0, 0, 0, 0, NULL);

DROP TABLE IF EXISTS sites;
CREATE TABLE sites (
  id VARCHAR(255) PRIMARY KEY,
  readOnly BOOLEAN NOT NULL,
  col DECIMAL(65) NOT NULL,
  row DECIMAL(65) NOT NULL
);
INSERT INTO sites (id, readOnly, col, row) VALUES ('null', 0, 0, 0);
INSERT INTO sites (id, readOnly, col, row) VALUES ('one', 0, 1, 1);

DROP TABLE IF EXISTS actions;
CREATE TABLE actions (
  id DECIMAL(65) PRIMARY KEY,
  userId DECIMAL(65) NOT NULL,
  undone BOOLEAN NOT NULL,
  json LONGTEXT NOT NULL,
  createdAt DATETIME NOT NULL
);

DROP TABLE IF EXISTS revisions;
CREATE TABLE revisions (
  tileId DECIMAL(65),
  fingerPrintId DECIMAL(65),
  fileId DECIMAL(65) NOT NULL,
  PRIMARY KEY (tileId, fingerPrintId)
);

DROP TABLE IF EXISTS tileActions;
CREATE TABLE tileActions (
  tileId DECIMAL(65),
  orderIndex DECIMAL(65),
  actionId DECIMAL(65) NOT NULL,
  PRIMARY KEY (tileId, orderIndex)
);

DROP TABLE IF EXISTS fingerPrints;
CREATE TABLE fingerPrints (
  id DECIMAL(65) PRIMARY KEY,
  done BOOLEAN NOT NULL,
  length DECIMAL(65) NOT NULL
);

DROP TABLE IF EXISTS fingerPrintRelations;
CREATE TABLE fingerPrintRelations (
  fingerPrintId DECIMAL(65),
  parentFingerPrintId DECIMAL(65),
  distance DECIMAL(65) NOT NULL,
  PRIMARY KEY (fingerPrintId, parentFingerPrintId)
);

DROP TABLE IF EXISTS annotations;
CREATE TABLE annotations (
  id DECIMAL(65) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  x DECIMAL(65) NOT NULL,
  y DECIMAL(65) NOT NULL
);
INSERT INTO annotations (id, title, x, y) VALUES (0, "Hello world!", 10, 10);
INSERT INTO annotations (id, title, x, y) VALUES (1, "Another test!", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (2, "Homer", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (3, "Marge", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (4, "Lisa", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (5, "Bart", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (6, "Maggie", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (7, "Moe", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (8, "Cletus", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (9, "Mr. Burns", -100, -100);
INSERT INTO annotations (id, title, x, y) VALUES (10, "Fruchtalarm!", -100, -100);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id DECIMAL(65) PRIMARY KEY,
  authorId DECIMAL(65) NOT NULL,
  text TEXT NOT NULL,
  createdAt DATETIME NOT NULL,
  annotationId DECIMAL(65)
);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (0, 0, "This is the first entry :-).", "2014-04-05 12:00:00", 0);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (1, 0, "This is the second entry :-).", "2014-04-04 12:00:00", 1);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (2, 0, "This is the third entry :-).", "2014-04-05 12:00:00", 2);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (3, 0, "This is the fourth entry :-).", "2014-04-05 12:00:00", 3);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (4, 0, "This is the fifth entry :-).", "2014-01-05 12:00:00", 4);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (5, 0, "This is the sixth entry :-).", "2014-04-05 12:00:00", 5);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (6, 0, "This is the seventh entry :-).", "2014-03-23 12:00:00", 6);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (7, 0, "This is the eighth entry :-).", "2014-04-05 12:00:00", 7);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (8, 0, "This is the ninth entry :-).", "2014-02-05 12:00:00", 8);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (9, 0, "This is the tenth entry :-).", "2014-04-05 12:00:00", 9);
INSERT INTO posts (id, authorId, text, createdAt, annotationId) VALUES (10, 0, "This is the eleventh entry :-).", "2014-03-05 12:00:00", 10);

DROP TABLE IF EXISTS postLikes;
CREATE TABLE postLikes (
  postId DECIMAL(65),
  userId DECIMAL(65),
  likedAt DATETIME NOT NULL,
  PRIMARY KEY (postId, userId)
);

DROP TABLE IF EXISTS annotationReads;
CREATE TABLE annotationReads (
  annotationId DECIMAL(65),
  userId DECIMAL(65),
  readAt DATETIME NOT NULL,
  PRIMARY KEY (annotationId, userId)
);

DROP TABLE IF EXISTS annotationWatches;
CREATE TABLE annotationWatches (
  annotationId DECIMAL(65),
  userId DECIMAL(65),
  PRIMARY KEY (annotationId, userId)
);