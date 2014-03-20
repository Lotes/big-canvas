DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id DECIMAL(65) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    defaultColor CHAR(7) NOT NULL
);
INSERT INTO users (id, name, password, defaultColor) VALUES (0, 'Demo user', '', '#FF0000');

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
  tileId DECIMAL(65) NOT NULL
);
INSERT INTO sites (id, readOnly, tileId) VALUES ('null', 0, 0);

DROP TABLE IF EXISTS actions;
CREATE TABLE actions (
    id DECIMAL(65) PRIMARY KEY,
    userId DECIMAL(65) NOT NULL,
    undone BOOLEAN NOT NULL,
    json LONGTEXT NOT NULL,
    createdOn TIMESTAMP NOT NULL
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