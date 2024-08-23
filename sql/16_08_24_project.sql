
CREATE DATABASE portfolio;

USE portfolio;

-----------
-- USER
------------
-- drop table user;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname varchar(20) not null,
    lname varchar(20),
    account int,
    email varchar(20)
);

-- ALTER TABLE user ADD COLUMN lname varchar(20), ADD COLUMN account int, ADD COLUMN email varchar(20);
-- ALTER TABLE user DROP COLUMN birthday, DROP COLUMN country;

INSERT INTO user (fname, lname, account, email) VALUES ('Sebastián', 'Hernández',4567890,'sebas@gmail.com');
INSERT INTO user (fname, lname, account, email) VALUES ('Mariano', 'Rangel',9876543,'mrangel@gmail.com');

-----------
-- COMPANY
------------
CREATE TABLE company (
    id_company varchar (20) PRIMARY KEY,
    cname varchar(20) not null,
    description varchar(500)
);

-- ALTER TABLE company MODIFY COLUMN description VARCHAR(500);

INSERT INTO company (id_company, cname, description) VALUES ('NFLX', 'Netflix', 'Netflix, Inc. es una empresa de entretenimiento y una plataforma de streaming estadounidense. Ubicada en Los Gatos, la compañía fue fundada el 29 de agosto de 1997 y un año después comenzó su actividad, ofreciendo un servicio de alquiler de DVD a través del correo postal.​');

-----------
-- STOCKS
------------
CREATE TABLE stocks (
    id_stock varchar(20) PRIMARY KEY,
    adj_close float,
    closing_cost float,
    opening_cost float,
    max_cost float,
    min_cost float,
    volume int,
    sdate date not null,
    id_company varchar(20),
    constraint id_company foreign key (id_company)
		references company(id_company)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO stocks (id_stock, adj_close, closing_cost, opening_cost, max_cost, min_cost, volume, sdate, id_company) VALUES ('21_nflx_1',780.98,30,50,70,30,9,'2024-08-21','NFLX');


-----------
-- TRANSACTIONS (BUY)
------------
CREATE TABLE buy (
    id_transactionb varchar(20) PRIMARY KEY,
    bdate date,
    stocks_bought int,
    cost float,
    tot_investment float,
    id int,
    id_company varchar (20),
    id_stock varchar (20),
    foreign key (id) references user(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    foreign key (id_company) references company(id_company)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    foreign key (id_stock) references stocks(id_stock)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO buy (id_transactionb, bdate, stocks_bought, cost, tot_investment, id, id_company, id_stock) 
VALUES ('1-1-1-1-1', '2024-08-22',5,476,8765,2,'NFLX','2023-08-21NFLX1013');

-----------
-- TRANSACTIONS (SELL)
------------
CREATE TABLE sell (
    id_transactions varchar(20) PRIMARY KEY,
    sdate date,
    stocks_sold int,
    adj_cost float,
    tot_sold float,
    id int,
    id_company varchar (20),
    id_stock varchar (20),
    foreign key (id) references user(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    foreign key (id_company) references company(id_company)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    foreign key (id_stock) references stocks(id_stock)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO sell (id_transactions, sdate, stocks_sold, adj_cost, tot_sold, id, id_company, id_stock) 
VALUES ('1-1-1-1-1-S', '2024-08-22',1,76,85,2,'NFLX','2023-08-21NFLX1013');