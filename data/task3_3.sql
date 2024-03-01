-- TODO Task 3
drop database if exists MartOrders;

create database MartOrders;

use MartOrders;

create table orderInput (
    orderId char(26) not null,
    date date,
    name varchar(256) not null,
    address varchar(256) not null,
    priority boolean,
    comments varchar(256),
 
    primary key(orderId)
);

create table cartLineItems (
    _id int auto_increment,
    productId varchar(256) not null,
    orderId char(26) not null,
    name varchar(256) not null,
    quantity int not null,
    price float not null,
 
    primary key(_id)
);

