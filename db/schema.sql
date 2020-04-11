DROP DATABASE IF EXISTS project2_db;

CREATE DATABASE project2_db;

use project2_db;

CREATE TABLE users(
	id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL,
    profilePicUrl VARCHAR(100),
    PRIMARY KEY (id)
);