DROP DATABASE IF EXISTS test_cal_one;

CREATE DATABASE test_cal_one;

USE test_cal_one;

CREATE TABLE events (
    id int AUTO_INCREMENT NOT NULL,
    title varchar(100),
    start varchar(50),
    end varchar(50),
    PRIMARY KEY(id)
);

INSERT INTO events (title,start,end)
VALUES ("4th of July","2020-07-04","2020-07-04"),
("Coding Class","2020-07-06T18:30","2020-07-06T21:30")