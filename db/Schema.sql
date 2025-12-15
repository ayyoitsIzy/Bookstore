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
    Email varchar(50) UNIQUE,
    Password varchar(50),
    ID int NOT NULL AUTO_INCREMENT ,
    Phone varchar(10) UNIQUE,
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
	Custom_ID int PRIMARY KEY auto_increment,
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

INSERT INTO Product (Prod_name, Category, Price, Product_stock) VALUES
('A5 Notebook Lined', 'Stationery', 45, 300),
('A4 Notebook Grid', 'Stationery', 65, 250),
('Ballpoint Pen Blue', 'Stationery', 12, 800),
('Ballpoint Pen Black', 'Stationery', 12, 760),
('Gel Pen 0.5mm', 'Stationery', 18, 600),
('Highlighter Yellow', 'Stationery', 25, 400),
('Highlighter Pink', 'Stationery', 25, 380),
('Mechaniproductcal Pencil', 'Stationery', 35, 420),
('Pencil HB', 'Stationery', 10, 900),
('Eraser Soft White', 'Stationery', 15, 500),
('Ruler 30cm', 'Stationery', 20, 300),
('Correction Tape', 'Stationery', 30, 350),
('Glue Stick 15g', 'Stationery', 20, 260),
('Stapler Small', 'Stationery', 45, 120),
('Staples No.10 Pack', 'Stationery', 15, 330),
('Sketchbook A4', 'Art Supplies', 85, 100),
('Colored Pencils 12-Pack', 'Art Supplies', 120, 90),
('Watercolor Set 12 Colors', 'Art Supplies', 150, 80),
('Paint Brush Set', 'Art Supplies', 80, 110),
('Canvas Board 30x40', 'Art Supplies', 95, 60),
('Novel - The Midnight Library', 'Books', 320, 40),
('Novel - The Alchemist', 'Books', 250, 50),
('Comic - One Piece Vol. 1', 'Books', 120, 85),
('Comic - Naruto Vol. 1', 'Books', 120, 90),
('Textbook - Basic Programming', 'Books', 550, 35),
('Textbook - Calculus I', 'Books', 620, 28),
('Planner 2025 Hardcover', 'Books', 299, 65),
('Diary Cute Cover', 'Stationery', 120, 150),
('Bookmark Metal', 'Accessories', 40, 220),
('Book Stand Adjustable', 'Accessories', 180, 95);

INSERT INTO image (path, Prod_id) VALUES
("IMG/product/1/1.webp",1),
("IMG/product/1/2.webp",1),
("IMG/product/1/3.webp",1),
("IMG/product/1/4.webp",1),

("IMG/product/2/1.webp",2),
("IMG/product/2/2.webp",2),
("IMG/product/2/3.webp",2),
("IMG/product/2/4.webp",2),

("IMG/product/3/1.webp",3),
("IMG/product/3/2.webp",3),
("IMG/product/3/3.webp",3),
("IMG/product/3/4.webp",3),

("IMG/product/4/1.webp",4),
("IMG/product/4/2.webp",4),
("IMG/product/4/3.webp",4),
("IMG/product/4/4.webp",4),

("IMG/product/5/1.webp",5),
("IMG/product/5/2.webp",5),
("IMG/product/5/3.webp",5),
("IMG/product/5/4.webp",5),

("IMG/product/6/1.webp",6),
("IMG/product/6/2.webp",6),
("IMG/product/6/3.webp",6),
("IMG/product/6/4.webp",6),

("IMG/product/7/1.webp",7),
("IMG/product/7/2.webp",7),
("IMG/product/7/3.webp",7),
("IMG/product/7/4.webp",7),

("IMG/product/8/1.webp",8),
("IMG/product/8/2.webp",8),
("IMG/product/8/3.webp",8),
("IMG/product/8/4.webp",8),

("IMG/product/9/1.webp",9),
("IMG/product/9/2.webp",9),
("IMG/product/9/3.webp",9),
("IMG/product/9/4.webp",9),

("IMG/product/10/1.webp",10),
("IMG/product/10/2.webp",10),
("IMG/product/10/3.webp",10),
("IMG/product/10/4.webp",10),

("IMG/product/11/1.webp",11),
("IMG/product/11/2.webp",11),
("IMG/product/11/3.webp",11),
("IMG/product/11/4.webp",11),

("IMG/product/12/1.webp",12),
("IMG/product/12/2.webp",12),
("IMG/product/12/3.webp",12),
("IMG/product/12/4.webp",12),

("IMG/product/13/1.webp",13),
("IMG/product/13/2.webp",13),
("IMG/product/13/3.webp",13),
("IMG/product/13/4.webp",13),

("IMG/product/14/1.webp",14),
("IMG/product/14/2.webp",14),
("IMG/product/14/3.webp",14),
("IMG/product/14/4.webp",14),

("IMG/product/15/1.webp",15),
("IMG/product/15/2.webp",15),
("IMG/product/15/3.webp",15),
("IMG/product/15/4.webp",15),

("IMG/product/16/1.webp",16),
("IMG/product/16/2.webp",16),
("IMG/product/16/3.webp",16),
("IMG/product/16/4.webp",16),

("IMG/product/17/1.webp",17),
("IMG/product/17/2.webp",17),
("IMG/product/17/3.webp",17),
("IMG/product/17/4.webp",17),

("IMG/product/18/1.webp",18),
("IMG/product/18/2.webp",18),
("IMG/product/18/3.webp",18),
("IMG/product/18/4.webp",18),

("IMG/product/19/1.webp",19),
("IMG/product/19/2.webp",19),
("IMG/product/19/3.webp",19),
("IMG/product/19/4.webp",19),

("IMG/product/20/1.webp",20),
("IMG/product/20/2.webp",20),
("IMG/product/20/3.webp",20),
("IMG/product/20/4.webp",20),

("IMG/product/21/1.webp",21),
("IMG/product/21/2.webp",21),
("IMG/product/21/3.webp",21),
("IMG/product/21/4.webp",21),

("IMG/product/22/1.webp",22),
("IMG/product/22/2.webp",22),
("IMG/product/22/3.webp",22),
("IMG/product/22/4.webp",22),

("IMG/product/23/1.webp",23),
("IMG/product/23/2.webp",23),
("IMG/product/23/3.webp",23),
("IMG/product/23/4.webp",23),

("IMG/product/24/1.webp",24),
("IMG/product/24/2.webp",24),
("IMG/product/24/3.webp",24),
("IMG/product/24/4.webp",24),

("IMG/product/25/1.webp",25),
("IMG/product/25/2.webp",25),
("IMG/product/25/3.webp",25),
("IMG/product/25/4.webp",25),

("IMG/product/26/1.webp",26),
("IMG/product/26/2.webp",26),
("IMG/product/26/3.webp",26),
("IMG/product/26/4.webp",26),

("IMG/product/27/1.webp",27),
("IMG/product/27/2.webp",27),
("IMG/product/27/3.webp",27),
("IMG/product/27/4.webp",27),

("IMG/product/28/1.webp",28),
("IMG/product/28/2.webp",28),
("IMG/product/28/3.webp",28),
("IMG/product/28/4.webp",28),

("IMG/product/29/1.webp",29),
("IMG/product/29/2.webp",29),
("IMG/product/29/3.webp",29),
("IMG/product/29/4.webp",29),

("IMG/product/30/1.webp",30),
("IMG/product/30/2.webp",30),
("IMG/product/30/3.webp",30),
("IMG/product/30/4.webp",30);

INSERT INTO discount values ("member",0);
INSERT INTO discount values ("silver",5);
INSERT INTO discount values ("gold",10);
INSERT INTO discount values ("platinum",20);

INSERT INTO user (first_name,Last_name,Email,Password,Phone,User_status,Tier)
VALUES ("jeerawat", "Komsang", "test@gmail.com","test1",021475142,"active","member");

INSERT INTO user (first_name,Last_name,Email,Password,Phone,User_status,Tier)
VALUES ("jedsadasdat", "Komasdasdang", "tedasdsad@gmail.com","test1",024276452,"active","member");

INSERT INTO promotion (Promotion_Name, Price, Banner, Start_Date, End_Date)
VALUES (
    'Back to School',
    120,
    'IMG/promotion/1.png',
    '2025-01-01',
    '2025-01-15'
);
INSERT INTO promotion_item (Promotion_ID, Prod_ID, Amount) VALUES (1, 1, 1);
INSERT INTO promotion_item (Promotion_ID, Prod_ID, Amount) VALUES (1, 3, 3);
INSERT INTO promotion_item (Promotion_ID, Prod_ID, Amount) VALUES (1, 4, 3);
INSERT INTO promotion_item (Promotion_ID, Prod_ID, Amount) VALUES (1, 5, 3);


INSERT INTO promotion (Promotion_Name, Price, Banner, Start_Date, End_Date)
VALUES (
    'new year sale',
    1000.00,
    'IMG/promotion/2.png',
    '2025-05-01',
    '2025-05-20'
);
INSERT INTO promotion_item (Promotion_ID, Prod_ID, Amount) VALUES (2, 27, 1);
INSERT INTO promotion_item (Promotion_ID, Prod_ID, Amount) VALUES (2, 25, 1);
INSERT INTO promotion_item (Promotion_ID, Prod_ID, Amount) VALUES (2, 26, 1);