DROP DATABASE IF EXISTS face-recognition;
CREATE DATABASE IF NOT EXISTS face-recognition;
USE face-recognition;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash varchar(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);