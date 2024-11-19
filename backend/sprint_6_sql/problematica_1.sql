
-- Primera Problematica
CREATE TABLE Tipo_Cliente (type_id INTEGER PRIMARY KEY, type_name TEXT NOT NULL);
CREATE TABLE Tipo_Cuenta (account_type_id INTEGER PRIMARY KEY, account_type_name TEXT NOT NULL);
CREATE TABLE Marca_Tarjeta (brand_id INTEGER PRIMARY KEY, brand_name TEXT NOT NULL);
INSERT INTO Tipo_Cliente (type_name) VALUES ('Classic'), ('Gold'), ('Black');
INSERT INTO Marca_Tarjeta (brand_name) VALUES ('Visa'), ('Mastercard'), ('American Express');
INSERT INTO Tipo_Cuenta (account_type_name) VALUES ('Caja de Ahorro'), ('Cuenta Corriente'), ('Cuenta Sueldo');


CREATE TABLE Tipo_tarjeta(
    card_type_id INTEGER PRIMARY KEY,
    card_type_name TEXT NOT NULL
);
INSERT INTO Tipo_tarjeta (card_type_name) VALUES ('credito'), ('debito');

CREATE TABLE Tarjeta (
    card_id INTEGER PRIMARY KEY,
    numero TEXT UNIQUE NOT NULL,
    cvv INTEGER NOT NULL CHECK (cvv BETWEEN 100 AND 999),
    fecha_otorgamiento TEXT NOT NULL,
    fecha_expiracion TEXT NOT NULL,
    brand_id INTEGER,
    customer_id INTEGER,
    tipo INTEGER,
    FOREIGN KEY (brand_id) REFERENCES Marca_Tarjeta(brand_id),
    FOREIGN KEY (customer_id) REFERENCES Cliente(customer_id),
    FOREIGN KEY (tipo) REFERENCES Tipo_tarjeta(card_type_id)
);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`,`tipo`)
VALUES
  (1,5480833357609937,"276","11/2023","01/2027",2,484,1),
  (2,4274227758191088,"923","08/2023","11/2026",2,10,1),
  (3,1870583942289018,"845","09/2024","11/2025",3,116,1),
  (4,1159398302863787,"219","02/2022","02/2026",1,78,1),
  (5,1639121817364223,"928","11/2022","08/2028",2,328,1),
  (6,3531720098043604,"464","03/2024","07/2027",2,93,2),
  (7,6456124712307355,"811","05/2022","04/2026",2,183,2),
  (8,8039928781937228,"692","10/2022","07/2027",2,328,2),
  (9,4439307777015066,"126","04/2021","05/2028",2,39,2),
  (10,9476128191810476,"157","07/2022","12/2025",3,52,2);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`,`tipo`)
VALUES
  (11,4342270680287389,"410","03/2021","10/2027",2,342,1),
  (12,3837404743780612,"556","12/2022","01/2029",2,59,1),
  (13,914560023436269,"707","08/2022","03/2029",2,58,1),
  (14,9819802820544212,"310","02/2023","12/2025",2,447,1),
  (15,6830858197401920,"763","09/2023","06/2028",2,129,1),
  (16,3622896236872685,"384","11/2022","06/2025",2,203,1),
  (17,8401709170253,"802","01/2022","11/2024",2,241,1),
  (18,4973927241887871,"843","07/2022","12/2024",2,243,2),
  (19,834782010797467,"619","02/2021","05/2029",1,495,2),
  (20,7878052212003909,"192","12/2023","03/2027",3,496,2);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`,`tipo`)
VALUES
  (21,6958339813215019,"486","05/2021","07/2028",2,289,1),
  (22,2141461580661540,"712","05/2021","03/2025",2,121,1),
  (23,1745263979611479,"546","03/2024","05/2029",2,229,1),
  (24,7575352239017646,"945","10/2023","10/2028",3,456,1),
  (25,1904173164827198,"250","02/2024","12/2028",2,14,1),
  (26,2771005921717319,"622","03/2023","02/2026",3,23,1),
  (27,1825983252922617,"256","09/2024","06/2028",1,381,2),
  (28,2566202356247766,"997","06/2023","02/2029",2,329,2),
  (29,4358665214578267,"519","04/2024","07/2025",1,160,2),
  (30,9011144129910840,"171","04/2024","04/2028",3,485,2);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`,`tipo`)
VALUES
  (31,7689659574239674,"572","02/2021","10/2029",2,499,1),
  (32,9659194077559736,"286","07/2021","09/2028",2,331,1),
  (33,6525768607185917,"585","12/2023","08/2025",2,16,1),
  (34,8337992760743794,"963","10/2022","05/2029",3,53,1),
  (35,4959323026742720,"400","10/2022","07/2029",2,100,1),
  (36,3130638769902156,"572","04/2021","10/2024",3,459,2),
  (37,9998849557137368,"186","07/2024","11/2024",1,329,2),
  (38,5594540847644421,"676","03/2022","07/2029",3,477,2),
  (39,8507190740296234,"662","04/2021","04/2025",2,262,2),
  (40,944190113951852,"627","09/2023","12/2026",2,413,2);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`,`tipo`)
VALUES
  (41,8771520006948451,"365","06/2024","01/2025",1,328,1),
  (42,8805314835248313,"828","10/2024","09/2028",1,453,1),
  (43,9516116628113848,"796","07/2024","12/2027",1,435,1),
  (44,6666573125582255,"542","07/2024","07/2025",3,104,1),
  (45,9046596342602968,"498","02/2023","06/2025",2,93,1),
  (46,2331734207416300,"782","02/2023","02/2025",2,11,2),
  (47,2355912251785063,"214","05/2023","08/2026",1,415,2),
  (48,1922275986304854,"736","10/2023","08/2025",2,310,2),
  (49,2016228431555466,"288","12/2022","03/2027",1,451,2),
  (50,3313547028973635,"840","10/2022","07/2029",3,85,2);

CREATE TABLE Direccion (
    address_id INTEGER PRIMARY KEY,
    calle TEXT NOT NULL,
    numero INTEGER NOT NULL,
    ciudad TEXT NOT NULL,
    provincia TEXT NOT NULL,
    codigo_postal TEXT
);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`)
VALUES
  (0,"Dirección no asignada",0, "0", "0", "0"),
  (1,"Linda Chavez",1182,"Burnie","Limón","3860"),
  (2,"Palmer Kirkland",6302,"Moose Jaw","Paraná","216187"),
  (3,"Jacob Houston",9209,"Oslo","Belgorod Oblast","R1X 5A0"),
  (4,"Arden Bowen",3346,"Owerri","Leinster","R0 9CQ"),
  (5,"Macey Kramer",5571,"Nässjö","Utrecht","3687"),
  (6,"Jordan Holt",7123,"Chungju","Västra Götalands län","65474-814"),
  (7,"Amena Cohen",6348,"Jauche","Leinster","25268"),
  (8,"Mercedes Hahn",4829,"Siquirres","Dalarnas län","4309"),
  (9,"Kieran Mcfadden",1612,"Manokwari","Ross-shire","645357"),
  (10,"Jenette Robinson",7263,"Tual","Minas Gerais","27-24");
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`)
VALUES
  (11,"Bruce Guthrie",6729,"Palangka Raya","North-East Region","12991-38959"),
  (12,"Hop Davenport",5070,"Trollhättan","South Gyeongsang","51115"),
  (13,"Myles Ballard",9073,"Harlingen","North Chungcheong","522570"),
  (14,"Gavin Cardenas",20,"Dumai","Poitou-Charentes","35-333"),
  (15,"Iona Rosa",5219,"Bukit Merah","Irkutsk Oblast","554545"),
  (16,"Nyssa Mccoy",778,"Hong Kong","Xīběi","11208"),
  (17,"Finn Mccarthy",3770,"Coinco","Pennsylvania","21918"),
  (18,"Tanya Patton",9379,"Wijnegem","Punjab","5367"),
  (19,"Neville Fry",6293,"Swan Hill","Pernambuco","3263 YN"),
  (20,"Beau Dixon",6620,"Palombaro","Maule","1178");
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`)
VALUES
  (21,"Yuli Bowers",3995,"Cabano","Madhya Pradesh","55245"),
  (22,"Jade Avery",785,"Caen","Extremadura","2215-3032"),
  (23,"Ezekiel Harding",3296,"Bamberg","Sindh","3477"),
  (24,"Nicholas Velazquez",1594,"Lambayeque","Balochistan","25658"),
  (25,"Amanda Goff",5251,"GŽrouville","Aydın","03-573"),
  (26,"Venus Coleman",5669,"Pekanbaru","Western Cape","G6U 4IB"),
  (27,"Abraham Noble",7958,"Lào Cai","Wielkopolskie","473075"),
  (28,"May Ramsey",9250,"Gölcük","West Region","28-418"),
  (29,"Charles Lamb",4080,"Galway","Riau","527736"),
  (30,"Ariana Nichols",3691,"Cotabato City","Davao Region","19085");
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`)
VALUES
  (31,"Ifeoma Boyer",5917,"Schleswig","An Giang","45738"),
  (32,"Anthony Dixon",4271,"Augusta","Bolívar","106280"),
  (33,"Amir Soto",3633,"Gulfport","Arica y Parinacota","133748"),
  (34,"Madonna Hogan",854,"Murcia","Aberdeenshire","81-39"),
  (35,"Deanna Kirkland",415,"Tengah","Limpopo","412142"),
  (36,"Quentin Malone",4333,"Porsgrunn","Dolnośląskie","2573"),
  (37,"Abel Soto",3725,"Whangarei","Bicol Region","7438"),
  (38,"Bree Duran",8603,"Manado","Ogun","3269"),
  (39,"Winifred Noel",2231,"Bhakkar","Ogun","78390"),
  (40,"Keaton Cochran",7045,"Pasir Ris","Alberta","524748");

CREATE TABLE Direccion_Cliente(
 customer_id INTEGER,
 address_id INTEGER ,
 FOREIGN KEY (customer_id) REFERENCES Cliente(customer_id),
 FOREIGN KEY (address_id) REFERENCES Direccion(address_id)
);
INSERT INTO Direccion_Cliente(customer_id,address_id) values
(1,1), (1,17),(2,3);
select c.customer_DNI, d.calle, d.numero from cliente c
join Direccion_Cliente dc on (dc.customer_id = c.customer_id)
join Direccion d on (d.address_id = dc.address_id)

ALTER TABLE empleado
ADD COLUMN address_id INTEGER DEFAULT 0;

ALTER TABLE sucursal
ADD COLUMN address_id INTEGER DEFAULT 0;

-- SQL LITE no deja agregar CONSTRAINT, pero sería así:
-- ALTER TABLE empleado
-- ADD CONSTRAINT fk_address_id FOREIGN KEY (address_id) REFERENCES Direccion(address_id);
-- ALTER TABLE sucursal
-- ADD CONSTRAINT fk_address_id FOREIGN KEY (address_id) REFERENCES Direccion(address_id);

CREATE TABLE Cuenta_temp (
    account_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    balance INTEGER NOT NULL,
    account_type_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES Cliente(customer_id),
    FOREIGN KEY (account_type_id) REFERENCES Tipo_Cuenta(account_type_id)
);


INSERT INTO Cuenta_temp (account_id, customer_id, balance)
SELECT account_id, customer_id, balance FROM Cuenta;

DROP TABLE Cuenta;
ALTER TABLE Cuenta_temp RENAME TO Cuenta;
INSERT INTO Cuenta(customer_id,balance,account_type_id) values
(1,1000,1), (2,2000,2), (3,3000,3), (4,4000,1), (5,5000,2), (6,6000,3), (7,7000,1), (8,8000,2), (9,9000,3), (10,10000,1);

UPDATE Empleado SET employee_hire_date = substr(employee_hire_date, 1, 10);