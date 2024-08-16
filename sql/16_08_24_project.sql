CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname varchar(20) not null,
    birthday date not null,
    country varchar(20) not null
);

--INSERT INTO user (fname, birthday, country) VALUES ('Mariano', '15-04-1994', 'Mexico');
--INSERT INTO user (fname, birthday, country) VALUES ('Sebas', '23-08-1996', 'Mexico');

--En mi computadora funciono con el siguiente formato atte Sebas:
INSERT INTO user (fname, birthday, country) VALUES ('Mariano', '1994-04-15', 'Mexico');
INSERT INTO user (fname, birthday, country) VALUES ('Sebas', '1995-08-23', 'Mexico');