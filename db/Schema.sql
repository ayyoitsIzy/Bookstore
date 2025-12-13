DROP database IF EXISTS Bookstore;
create database Bookstore;
use Bookstore;


create table discount(
	Tier ENUM('member','silver','gold','platinum') primary key ,
    discount NUMERIC
);

create table user(
	First_name varchar(20),
    Last_name varchar(20),
    Email varchar(50),
    Password varchar(50),
    ID int NOT NULL AUTO_INCREMENT ,
    Phone Numeric,
    User_status Enum("active","inactive"),
    Tier ENUM('member','silver','gold','platinum'),
    PRIMARY KEY (ID),
    foreign key(Tier) references discount(Tier)
);

create table Product(
	Prod_name varchar(50),
    Category varchar(20),
    Price NUMERIC ,
    Prod_ID int auto_increment primary key,
    description varchar(500) DEFAULT  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do aliqua.Ut enim ad minim Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Product_stock NUMERIC
);

create table Bill(
	ID int,
    Bill_ID int auto_increment primary key,
    total_price numeric,
    date datetime,
    foreign key (ID) references User(ID) 
);

create table orders(
	Prod_ID int,
    Bill_ID int,
    Amount numeric,
    foreign key (Prod_ID) references Product(Prod_ID),
    foreign key (Bill_ID) references Bill(Bill_ID),
    primary key(Prod_ID,Bill_ID)
);

create table image(
    Path varchar(100),
    Prod_ID int,
    foreign key (Prod_ID ) references product(Prod_ID ),
    primary key(Prod_ID,Path)
);

create table Custom_Order(
	Custom_ID int auto_increment PRIMARY KEY,
    NAME VARCHAR(30),
    faculty ENUM("MECHANICLE","CIVIL","MTH","PHY"),
    waist NUMERIC,
    hip NUMERIC,
    arm NUMERIC,
    price NUMERIC,
    status ENUM("Cancelled","Pending","Done"),
    Bill_ID int,
    foreign key (Bill_ID) references Bill(Bill_ID)
);


create table promotion(
	Promotion_Name varchar(20),
    Promotion_ID int auto_increment primary key,
    Price Numeric,
    Banner varchar(300),
    Start_Date date,
    End_Date date
);


create table promotion_item(
	Promotion_ID int,
    Prod_ID int,
    Amount numeric,
    foreign key(Promotion_ID) references Promotion(Promotion_ID),
    foreign key(Prod_ID) references Product(Prod_ID),
    primary key(Promotion_ID,Prod_ID)
);

create table promotion_order(
	Promotion_ID int,
    Bill_ID int,
    Amount numeric,
	foreign key(Promotion_ID) references Promotion(Promotion_ID),
    foreign key(Bill_ID) references Bill(Bill_ID),
    primary key(Promotion_ID,Bill_ID)
);






#select * from product;