
-- Primera Problematica

CREATE TABLE Tipo_Cliente (type_id INTEGER PRIMARY KEY, type_name TEXT NOT NULL);
CREATE TABLE Tipo_Cuenta (account_type_id INTEGER PRIMARY KEY, account_type_name TEXT NOT NULL);
CREATE TABLE Marca_Tarjeta (brand_id INTEGER PRIMARY KEY, brand_name TEXT NOT NULL);

INSERT INTO Marca_Tarjeta (brand_name) VALUES ('Visa'), ('Mastercard'), ('American Express');

CREATE TABLE Tarjeta (
    card_id INTEGER PRIMARY KEY,
    numero TEXT UNIQUE NOT NULL,
    cvv INTEGER NOT NULL CHECK (cvv BETWEEN 100 AND 999),
    fecha_otorgamiento TEXT NOT NULL,
    fecha_expiracion TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('credito', 'debito')),
    brand_id INTEGER,
    customer_id INTEGER,
    FOREIGN KEY (brand_id) REFERENCES Marca_Tarjeta(brand_id),
    FOREIGN KEY (customer_id) REFERENCES Cliente(customer_id)
);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`)
VALUES
  (1,5480833357609937,"276","11/2023","01/2027",2,484),
  (2,4274227758191088,"923","08/2023","11/2026",2,10),
  (3,1870583942289018,"845","09/2024","11/2025",3,116),
  (4,1159398302863787,"219","02/2022","02/2026",1,78),
  (5,1639121817364223,"928","11/2022","08/2028",2,328),
  (6,3531720098043604,"464","03/2024","07/2027",2,93),
  (7,6456124712307355,"811","05/2022","04/2026",2,183),
  (8,8039928781937228,"692","10/2022","07/2027",2,328),
  (9,4439307777015066,"126","04/2021","05/2028",2,39),
  (10,9476128191810476,"157","07/2022","12/2025",3,52);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`)
VALUES
  (11,4342270680287389,"410","03/2021","10/2027",2,342),
  (12,3837404743780612,"556","12/2022","01/2029",2,59),
  (13,914560023436269,"707","08/2022","03/2029",2,58),
  (14,9819802820544212,"310","02/2023","12/2025",2,447),
  (15,6830858197401920,"763","09/2023","06/2028",2,129),
  (16,3622896236872685,"384","11/2022","06/2025",2,203),
  (17,8401709170253,"802","01/2022","11/2024",2,241),
  (18,4973927241887871,"843","07/2022","12/2024",2,243),
  (19,834782010797467,"619","02/2021","05/2029",1,495),
  (20,7878052212003909,"192","12/2023","03/2027",3,496);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`)
VALUES
  (21,6958339813215019,"486","05/2021","07/2028",2,289),
  (22,2141461580661540,"712","05/2021","03/2025",2,121),
  (23,1745263979611479,"546","03/2024","05/2029",2,229),
  (24,7575352239017646,"945","10/2023","10/2028",3,456),
  (25,1904173164827198,"250","02/2024","12/2028",2,14),
  (26,2771005921717319,"622","03/2023","02/2026",3,23),
  (27,1825983252922617,"256","09/2024","06/2028",1,381),
  (28,2566202356247766,"997","06/2023","02/2029",2,329),
  (29,4358665214578267,"519","04/2024","07/2025",1,160),
  (30,9011144129910840,"171","04/2024","04/2028",3,485);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`)
VALUES
  (31,7689659574239674,"572","02/2021","10/2029",2,499),
  (32,9659194077559736,"286","07/2021","09/2028",2,331),
  (33,6525768607185917,"585","12/2023","08/2025",2,16),
  (34,8337992760743794,"963","10/2022","05/2029",3,53),
  (35,4959323026742720,"400","10/2022","07/2029",2,100),
  (36,3130638769902156,"572","04/2021","10/2024",3,459),
  (37,9998849557137368,"186","07/2024","11/2024",1,329),
  (38,5594540847644421,"676","03/2022","07/2029",3,477),
  (39,8507190740296234,"662","04/2021","04/2025",2,262),
  (40,944190113951852,"627","09/2023","12/2026",2,413);
INSERT INTO `Tarjeta` (`card_id`,`numero`,`cvv`,`fecha_otorgamiento`,`fecha_expiracion`,`brand_id`,`customer_id`)
VALUES
  (41,8771520006948451,"365","06/2024","01/2025",1,328),
  (42,8805314835248313,"828","10/2024","09/2028",1,453),
  (43,9516116628113848,"796","07/2024","12/2027",1,435),
  (44,6666573125582255,"542","07/2024","07/2025",3,104),
  (45,9046596342602968,"498","02/2023","06/2025",2,93),
  (46,2331734207416300,"782","02/2023","02/2025",2,11),
  (47,2355912251785063,"214","05/2023","08/2026",1,415),
  (48,1922275986304854,"736","10/2023","08/2025",2,310),
  (49,2016228431555466,"288","12/2022","03/2027",1,451),
  (50,3313547028973635,"840","10/2022","07/2029",3,85);

CREATE TABLE Direccion (
    address_id INTEGER PRIMARY KEY,
    calle TEXT NOT NULL,
    numero INTEGER NOT NULL,
    ciudad TEXT NOT NULL,
    provincia TEXT NOT NULL,
    codigo_postal TEXT,
    customer_id INTEGER,
    employee_id INTEGER,
    branch_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES Cliente(customer_id),
    FOREIGN KEY (employee_id) REFERENCES Empleado(employee_id),
    FOREIGN KEY (branch_id) REFERENCES Sucursal(branch_id)
);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (1,"Linda Chavez",1182,"Burnie","Limón","3860",354,461,61),
  (2,"Palmer Kirkland",6302,"Moose Jaw","Paraná","216187",256,275,88),
  (3,"Jacob Houston",9209,"Oslo","Belgorod Oblast","R1X 5A0",201,252,38),
  (4,"Arden Bowen",3346,"Owerri","Leinster","R0 9CQ",83,432,23),
  (5,"Macey Kramer",5571,"Nässjö","Utrecht","3687",450,359,82),
  (6,"Jordan Holt",7123,"Chungju","Västra Götalands län","65474-814",220,126,48),
  (7,"Amena Cohen",6348,"Jauche","Leinster","25268",190,246,30),
  (8,"Mercedes Hahn",4829,"Siquirres","Dalarnas län","4309",149,264,10),
  (9,"Kieran Mcfadden",1612,"Manokwari","Ross-shire","645357",366,269,97),
  (10,"Jenette Robinson",7263,"Tual","Minas Gerais","27-24",23,310,7);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (11,"Bruce Guthrie",6729,"Palangka Raya","North-East Region","12991-38959",478,121,88),
  (12,"Hop Davenport",5070,"Trollhättan","South Gyeongsang","51115",337,214,91),
  (13,"Myles Ballard",9073,"Harlingen","North Chungcheong","522570",178,99,93),
  (14,"Gavin Cardenas",20,"Dumai","Poitou-Charentes","35-333",305,349,96),
  (15,"Iona Rosa",5219,"Bukit Merah","Irkutsk Oblast","554545",6,5,79),
  (16,"Nyssa Mccoy",778,"Hong Kong","Xīběi","11208",94,477,93),
  (17,"Finn Mccarthy",3770,"Coinco","Pennsylvania","21918",453,379,98),
  (18,"Tanya Patton",9379,"Wijnegem","Punjab","5367",111,137,46),
  (19,"Neville Fry",6293,"Swan Hill","Pernambuco","3263 YN",415,254,66),
  (20,"Beau Dixon",6620,"Palombaro","Maule","1178",134,198,9);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (21,"Yuli Bowers",3995,"Cabano","Madhya Pradesh","55245",83,49,35),
  (22,"Jade Avery",785,"Caen","Extremadura","2215-3032",449,359,16),
  (23,"Ezekiel Harding",3296,"Bamberg","Sindh","3477",106,390,69),
  (24,"Nicholas Velazquez",1594,"Lambayeque","Balochistan","25658",474,237,77),
  (25,"Amanda Goff",5251,"GŽrouville","Aydın","03-573",449,257,81),
  (26,"Venus Coleman",5669,"Pekanbaru","Western Cape","G6U 4IB",154,443,16),
  (27,"Abraham Noble",7958,"Lào Cai","Wielkopolskie","473075",110,156,23),
  (28,"May Ramsey",9250,"Gölcük","West Region","28-418",403,310,47),
  (29,"Charles Lamb",4080,"Galway","Riau","527736",416,102,58),
  (30,"Ariana Nichols",3691,"Cotabato City","Davao Region","19085",419,2,20);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (31,"Ifeoma Boyer",5917,"Schleswig","An Giang","45738",41,413,59),
  (32,"Anthony Dixon",4271,"Augusta","Bolívar","106280",316,466,12),
  (33,"Amir Soto",3633,"Gulfport","Arica y Parinacota","133748",192,450,12),
  (34,"Madonna Hogan",854,"Murcia","Aberdeenshire","81-39",413,212,26),
  (35,"Deanna Kirkland",415,"Tengah","Limpopo","412142",472,167,15),
  (36,"Quentin Malone",4333,"Porsgrunn","Dolnośląskie","2573",422,97,88),
  (37,"Abel Soto",3725,"Whangarei","Bicol Region","7438",408,306,54),
  (38,"Bree Duran",8603,"Manado","Ogun","3269",415,465,81),
  (39,"Winifred Noel",2231,"Bhakkar","Ogun","78390",6,50,1),
  (40,"Keaton Cochran",7045,"Pasir Ris","Alberta","524748",84,74,41);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (41,"Jaquelyn Holland",7128,"Odessa","North-East Region","5624",118,111,7),
  (42,"Christian Stevens",8784,"Swadlincote","Yukon","77124",292,230,79),
  (43,"Alexandra Berger",5684,"Linköping","Vestfold og Telemark","183616",374,185,4),
  (44,"Valentine Gill",7859,"Dapitan","Overijssel","082930",261,35,77),
  (45,"Chloe Durham",4955,"Arequipa","Central Kalimantan","95778",96,250,51),
  (46,"Dane Byrd",6152,"Chile Chico","Marche","12322-53457",424,166,31),
  (47,"Dustin Pennington",6163,"Falun","Gävleborgs län","38-49",338,443,21),
  (48,"Claudia Whitley",2716,"Gore","San José","5771",482,367,56),
  (49,"Anika Carter",8883,"Dapitan","South Australia","24855",31,169,49),
  (50,"Dean Whitley",5611,"Muntinlupa","Hải Phòng","175807",178,96,89);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (51,"Blaze Randolph",9830,"Aguacaliente (San Francisco]","Dolnośląskie","33287",296,332,60),
  (52,"Charlotte Grant",5034,"Regensburg","Xīnán","4522",358,297,7),
  (53,"Alana Cote",2899,"Cambridge","Saskatchewan","37350",197,389,33),
  (54,"Glenna Raymond",3872,"Mata de Plátano","Mississippi","33564",152,426,55),
  (55,"Hop Sweeney",4105,"Puerto Nariño","Carinthia","13554",225,60,10),
  (56,"Winifred Gallagher",4506,"Oldenzaal","Leinster","171524",109,453,38),
  (57,"Kay Summers",2405,"Corby","Michoacán","2772 MW",118,330,27),
  (58,"Eaton Tillman",2012,"Santander","Cheshire","78707",351,399,2),
  (59,"Grant Talley",4877,"Pinetown","Zakarpattia oblast","664253",256,129,86),
  (60,"Vincent Wilder",180,"Chulucanas","West Nusa Tenggara","756773",245,319,17);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (61,"Brock Conway",7393,"San Fernando","Biobío","8777 TK",64,102,79),
  (62,"Ria Mcclain",7420,"Linköping","Hidalgo","45202-372",299,301,80),
  (63,"Ramona Holmes",690,"Lutsk","Pará","9286",121,61,9),
  (64,"Gregory Rhodes",2893,"Bandar Lampung","Minnesota","0647-4854",36,31,4),
  (65,"Daryl Gates",798,"Onitsha","Madhya Pradesh","2821",490,395,19),
  (66,"Noble Cooke",4667,"Quesada","Michoacán","454795",201,309,68),
  (67,"Dennis Kinney",7961,"Jaboatão dos Guararapes","Northern Cape","26813",80,431,71),
  (68,"Derek Poole",224,"Baguio","Meghalaya","512242",191,27,67),
  (69,"Uma Thornton",8393,"Casalvieri","Goiás","36-12",412,125,48),
  (70,"Dara Simmons",1579,"Queenstown","Putumayo","64294",429,490,90);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (71,"Erica Sparks",1895,"Meppel","North Gyeongsang","283578",337,112,10),
  (72,"Lacey Heath",2845,"Changi","Dolnośląskie","854956",476,67,16),
  (73,"Shad Ellis",5167,"Straubing","Trentino-Alto Adige","1617",157,54,34),
  (74,"Nigel Sandoval",8759,"Reyhanlı","New South Wales","372874",107,246,21),
  (75,"Lydia Douglas",8910,"Almere","North Gyeongsang","2771",124,321,94),
  (76,"Odessa Stanley",1562,"Sortland","Warmińsko-mazurskie","22665",298,15,71),
  (77,"Leandra Woodard",5693,"Swellendam","Maryland","748374",276,326,14),
  (78,"Jared Molina",4289,"Rathenow","Molise","10318",97,495,83),
  (79,"Macey Parrish",6947,"Lokeren","Munster","352168",455,311,57),
  (80,"Bert Woods",9490,"Bayugan","Meta","241675",4,322,5);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (81,"Tate Michael",2660,"Murcia","Araucanía","3214",319,183,97),
  (82,"Adele Mcpherson",8046,"Waidhofen an der Ybbs","West Lothian","567149",439,336,85),
  (83,"Stella Bush",9413,"Green Bay","Virginia","7252",331,16,78),
  (84,"Vladimir Dominguez",445,"Maidstone","Sachsen-Anhalt","37721",175,440,53),
  (85,"Lee Frederick",3084,"Bergen","Östergötlands län","188664",110,306,39),
  (86,"Justina O'Neill",6014,"Bayeux","Lipetsk Oblast","10513",445,81,32),
  (87,"Amelia Reyes",1222,"Klerksdorp","Namen","2488",47,114,53),
  (88,"Sandra Sykes",8710,"Hay River","Namen","644754",84,64,83),
  (89,"Sigourney Berger",4282,"Poltava","Nebraska","LO81 5OS",159,478,7),
  (90,"Nomlanga Bishop",7141,"Kropyvnytskyi","Khyber Pakhtoonkhwa","802416",194,211,38);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (91,"Richard Burgess",6583,"Macduff","South Island","73774",12,388,72),
  (92,"Tasha Gentry",1662,"Kohima","Baden Württemberg","315804",139,345,97),
  (93,"Grady Snider",9991,"Szczecin","Coahuila","32658",205,216,62),
  (94,"Dolan Boyd",1482,"Gwadar","Hồ Chí Minh City","345947",110,28,92),
  (95,"Nola Vang",9334,"Philadelphia","Cauca","207215",130,226,7),
  (96,"Zeus Calderon",7858,"Águas Lindas de Goiás","Heredia","727061",406,359,68),
  (97,"Echo Heath",9858,"Sinaai-Waas","Île-de-France","1915",20,409,10),
  (98,"Joshua Greene",7177,"Cork","Nordland","743643",412,154,13),
  (99,"Andrew Stokes",8527,"San Diego","Sachsen","673551",277,470,25),
  (100,"Mira Richard",532,"Palma de Mallorca","Virginia","13152",27,146,2);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (101,"Zephania David",5429,"Sydney","Tyrol","46008",72,171,16),
  (102,"Pandora Williamson",9878,"Salvador","Bình Dương","578297",331,405,43),
  (103,"Ferdinand Lopez",9524,"Ålesund","Zhōngnán","46311",424,128,29),
  (104,"Lane Hendrix",6919,"Kaliningrad","Gujarat","4917",97,122,54),
  (105,"Lacy Atkinson",3732,"Tuluá","Huáběi","18866",251,50,21),
  (106,"Ava Pittman",4811,"Lambayeque","Bengkulu","72763",302,110,53),
  (107,"Eagan Combs",2502,"Pinetown","North West","242132",86,264,89),
  (108,"Kelly Berg",5171,"Mercedes","Dalarnas län","02178",131,298,2),
  (109,"Jorden Calderon",3740,"Tandag","Quebec","194283",12,72,77),
  (110,"Megan Figueroa",7640,"Quesada","Calabria","18-87",137,121,8);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (111,"Teagan Suarez",4973,"Kędzierzyn-Koźle","Maule","22547",339,459,98),
  (112,"Alexander Tillman",4007,"Navojoa","Khyber Pakhtoonkhwa","2869-2146",136,35,92),
  (113,"Keiko Gonzales",1130,"Makati","South Gyeongsang","96410-75058",235,219,58),
  (114,"Elizabeth Campbell",2811,"Białystok","Agder","4615",344,448,34),
  (115,"Roanna Randolph",2066,"Pretoria","Santa Catarina","1256",163,50,99),
  (116,"Dara Montoya",1653,"Turrialba","Xīnán","41160-88738",434,378,2),
  (117,"Merrill Coleman",7940,"Lidingo","Bourgogne","3267",469,152,56),
  (118,"Amena Kaufman",7133,"Picton","Central Region","2357",222,72,92),
  (119,"Theodore Barry",6076,"Odda","Poltava oblast","141476",177,420,47),
  (120,"Rigel Cervantes",4597,"Yeosu","Waals-Brabant","4813-8868",318,498,76);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (121,"Donna Richards",8092,"Niterói","Central Region","938468",7,493,54),
  (122,"Kevin Morin",9888,"Namsos","Vorarlberg","28064",143,317,26),
  (123,"Whoopi Robertson",3251,"Götzis","Brussels Hoofdstedelijk Gewest","7717",94,208,38),
  (124,"Hanae Dunn",5207,"Bostaniçi","Nordland","8045",311,372,26),
  (125,"Willa Pearson",8948,"Gumi","Azad Kashmir","342345",377,324,89),
  (126,"Julian Flowers",9859,"Guangdong","South Chungcheong","7367 MY",36,130,88),
  (127,"Lane Ford",4755,"San Isidro de El General","Voronezh Oblast","2597 IM",398,229,69),
  (128,"Lacey Webb",1202,"Hattem","Central Luzon","2832 KL",195,282,86),
  (129,"Samuel Roman",1806,"Tyumen","Styria","693610",114,376,74),
  (130,"Fiona Jensen",6687,"Canberra","Puglia","5452",431,297,28);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (131,"Willa Stephens",2244,"Ereğli","Nova Scotia","4271",107,309,74),
  (132,"Amos Whitaker",4731,"Osogbo","Free State","44281",284,190,35),
  (133,"Clio Mann",1325,"Kędzierzyn-Koźle","Huáběi","359651",87,23,74),
  (134,"Hamilton Mathis",5424,"Orléans","Vinnytsia oblast","02781",464,215,59),
  (135,"Alexa Fry",8586,"Belfast","Delaware","7734 WG",91,421,62),
  (136,"Fiona Patton",5931,"Belfast","Lanarkshire","61152-770",330,340,8),
  (137,"Maisie Tillman",3061,"Calapan","Valle d'Aosta","685635",5,422,25),
  (138,"Risa Woods",5690,"Balclutha","San Luis Potosí","43155-614",251,114,46),
  (139,"Jordan Sargent",6604,"Illkirch-Graffenstaden","Molise","84812",102,308,11),
  (140,"Hasad Townsend",2933,"Liaoning","Utrecht","1029-3670",155,31,72);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (141,"Hall Young",2221,"Tibet","Guanacaste","77-597",84,164,51),
  (142,"Kadeem Pope",408,"Nova Kakhovka","Brandenburg","41651",196,206,30),
  (143,"Ivan Cannon",6950,"Spittal an der Drau","Araucanía","5555",456,306,83),
  (144,"Ivan Conner",155,"Brunn am Gebirge","Western Australia","63228-24415",186,79,42),
  (145,"Wing Roman",463,"Trondheim","Ulster","42367",287,151,47),
  (146,"Geoffrey Walters",8231,"Jönköping","Zhōngnán","486351",222,93,82),
  (147,"Armand Le",3651,"San José de Alajuela","Cagayan Valley","8074",288,19,96),
  (148,"Carson Vang",3306,"Tanjungbalai","Limburg","943898",114,250,34),
  (149,"Laura Brooks",6979,"Mission","West Bengal","12664",229,398,8),
  (150,"Kieran Porter",8951,"Liaoning","Heredia","578937",127,73,33);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (151,"Summer Clemons",9506,"Konin","Perthshire","206732",482,352,97),
  (152,"Rae Lucas",8773,"Hubei","Cheshire","48394",399,99,11),
  (153,"Jada Odom",7751,"Khrustalnyi","Burgenland","68627-17975",344,238,22),
  (154,"Hector Benjamin",9250,"Thủ Dầu Một","Cantabria","36-921",76,77,35),
  (155,"Bruce Mclean",6042,"Cañas","Östergötlands län","8437",93,66,88),
  (156,"Jameson Allen",8955,"Ełk","Zachodniopomorskie","10302",316,286,67),
  (157,"Quentin Blackburn",1967,"Qinghai","Limburg","635758",359,255,53),
  (158,"Nasim Lopez",4912,"General Escobedo","Lâm Đồng","72121",51,301,6),
  (159,"Olga Mccarty",3177,"Calama","Cartago","64094",248,46,63),
  (160,"Logan Joyner",8980,"Perpignan","Azad Kashmir","755135",33,417,28);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (161,"Tatum Lee",9237,"Outram","Paraná","9913",385,131,35),
  (162,"Kennedy Hopper",9662,"Matiari","Jeju","382164",498,215,90),
  (163,"Denton Gates",8609,"Oviedo","Ancash","753597",462,309,32),
  (164,"Karyn Harvey",5061,"Edremit","South Chungcheong","51202",458,195,48),
  (165,"Kirk Wynn",5511,"Galway","Tarapacá","151564",323,216,29),
  (166,"Murphy Reese",3438,"Van","Andalucía","01165-65453",448,370,8),
  (167,"Randall May",1750,"Calama","North Island","34803706",39,56,79),
  (168,"Ray Park",3853,"Shaanxi","Namen","2681",6,351,49),
  (169,"Kuame Clark",7365,"Lehri","Northwest Territories","7344-6617",330,112,98),
  (170,"Quemby Trevino",8867,"Whyalla","Xīnán","713585",216,498,30);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (171,"Madaline Sims",5532,"Buken","Dalarnas län","31404",193,312,36),
  (172,"Keelie Snyder",8144,"Devonport","Coquimbo","75-775",11,320,56),
  (173,"Ava Villarreal",2606,"Falun","Chocó","855746",33,431,67),
  (174,"Quentin Shaffer",5965,"Saskatoon","Magallanes y Antártica Chilena","433405",28,392,76),
  (175,"Ciaran Noel",8462,"Emmen","Vlaams-Brabant","937489",284,497,3),
  (176,"Miranda Charles",3776,"Huế","Arequipa","41513",205,48,16),
  (177,"Shad West",5165,"Vadsø","Guanacaste","10816",151,344,49),
  (178,"Elmo Mejia",7901,"Nizhny","Vlaams-Brabant","382574",121,438,64),
  (179,"Steven Cruz",7384,"Springs","Balochistan","30778",137,286,75),
  (180,"Louis Franks",8939,"Barrow-in-Furness","Kaluga Oblast","5507",411,385,55);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (181,"Donovan Cole",8853,"Kharkiv","Flintshire","4581",199,410,67),
  (182,"Brady Dyer",2127,"Shimla","Murcia","28-389",230,223,88),
  (183,"Harper Kirby",1774,"Nicoya","Casanare","N6G 8BP",177,366,31),
  (184,"Holly Noble",8192,"Oslo","Central Region","40-936",267,419,95),
  (185,"Echo Moran",2073,"Hofors","Jeju","242467",38,175,56),
  (186,"Lacy Ewing",7593,"Huacho","Assam","253247",439,357,20),
  (187,"Zachery Carrillo",2747,"Silvassa","Stockholms län","C6K 5J2",109,450,37),
  (188,"Brody Stokes",924,"Berg","South Chungcheong","584709",209,235,38),
  (189,"Malcolm Ayala",6039,"Nijmegen","Oslo","3310",482,461,32),
  (190,"Ferdinand Talley",721,"Nordhorn","Guanacaste","8731",149,4,59);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (191,"Inez Sparks",2260,"Oaxaca","Languedoc-Roussillon","679524",138,331,50),
  (192,"Benedict Mckay",6595,"Belfast","Limón","31231",218,25,42),
  (193,"Barrett Sellers",9825,"Loralai","South Island","621292",499,150,55),
  (194,"Dean Frye",8719,"Puntarenas","Limpopo","82656",343,359,87),
  (195,"Isabelle Dejesus",4466,"Villahermosa","Somerset","541370",224,82,38),
  (196,"Leroy Padilla",6939,"Ballarat","Luik","2021",451,50,45),
  (197,"Cyrus Suarez",1040,"Điện Biên Phủ","Östergötlands län","6210 MX",355,499,29),
  (198,"Brenda Nieves",3207,"Iriga","Nord-Pas-de-Calais","18650-488",69,199,12),
  (199,"Zeus Moss",3114,"Zaria","Indiana","8496",493,287,13),
  (200,"Basil Dickerson",8006,"Alphen aan den Rijn","Hà Nội","03-041",269,26,34);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (201,"Jenna Reeves",9890,"Kędzierzyn-Koźle","Franche-Comté","422334",280,183,52),
  (202,"Travis Mayo",2036,"Campinas","North Island","26098",44,45,16),
  (203,"Rachel Chase",2731,"Pukekohe","Nova Scotia","85146-486",14,157,39),
  (204,"Rachel Salinas",9734,"Nizhny","Ulster","886762",88,402,13),
  (205,"Quinn Ross",7629,"Serang","Sevastopol City","35863",223,455,97),
  (206,"Madison Dixon",6228,"Gorontalo","Trøndelag","43174",293,333,22),
  (207,"Neve Salas",9529,"Paarl","Cundinamarca","148478",332,468,12),
  (208,"Mikayla Hoover",1791,"Santa Rosa","Sutherland","266871",28,144,25),
  (209,"Giacomo Solomon",9477,"Sint-Joost-ten-Node","Boyacá","814640",123,242,38),
  (210,"Colette Byers",3749,"Baguio","Oryol Oblast","176764",156,245,84);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (211,"Brooke Bishop",8576,"Holyhead","Adana","41749-36766",251,256,15),
  (212,"Iris Henderson",6600,"Portsmouth","Flevoland","7879",311,136,15),
  (213,"Len Bartlett",1502,"Glendale","Veracruz","6791",455,36,14),
  (214,"Flynn Burnett",5988,"Camiña","Salzburg","69-977",461,123,49),
  (215,"Kasimir Hart",5247,"Mjölby","Ulster","54555-345",302,128,38),
  (216,"Wyoming Hines",2871,"Charlottetown","Adana","2442",86,384,56),
  (217,"Lara Buck",4655,"Ryazan","Uttar Pradesh","378743",122,292,53),
  (218,"Hanae Sweeney",9857,"Palma de Mallorca","Bursa","847414",289,203,3),
  (219,"Claire Riggs",3444,"Mexicali","Uttar Pradesh","44112",331,210,52),
  (220,"Daniel Finch",3070,"Canberra","Đồng Tháp","8038",67,15,35);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (221,"Reuben Logan",4296,"Izium","North-East Region","97321",49,410,15),
  (222,"Kamal Noel",210,"Dublin","South Island","50202",68,437,3),
  (223,"Kathleen Winters",7952,"Sluis","Huila","5831",207,34,18),
  (224,"Ronan Butler",8415,"Perchtoldsdorf","Heredia","7843",332,195,38),
  (225,"August Baker",9003,"General Lagos","Bahia","13083",123,471,67),
  (226,"Suki Leblanc",8238,"Guaitecas","Euskadi","73587",15,170,47),
  (227,"Alfreda Patterson",9879,"Kitzbühel","Phú Thọ","67731-97275",487,21,96),
  (228,"Michael Parker",6539,"Linz","Tarapacá","635467",287,3,99),
  (229,"Nita Riggs",7438,"Neustadt am Rübenberge","West Region","617878",336,420,5),
  (230,"Deirdre Moran",6997,"Borås","Wigtownshire","51645",29,272,72);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (231,"Kirsten Olson",9305,"Bilbo","Ancash","8327",397,218,84),
  (232,"Amelia Bates",7967,"Hamilton","Prince Edward Island","857740",351,455,90),
  (233,"Lacey Cook",6397,"Mathura","Møre og Romsdal","4898-8472",43,413,76),
  (234,"Montana Emerson",8171,"Tambov","Ivano-Frankivsk oblast","187704",83,327,64),
  (235,"Reagan Page",216,"Ceuta","Aquitaine","5698",30,97,15),
  (236,"Rachel Finley",4930,"Silchar","Shetland","8834",351,175,41),
  (237,"Kermit Olson",1911,"Borås","Cesar","31571",81,248,91),
  (238,"Abraham Juarez",9077,"Mianwali","Campania","21643",224,200,72),
  (239,"Whilemina Battle",3772,"Pencahue","Friuli-Venezia Giulia","737428",155,473,65),
  (240,"Erasmus Steele",1844,"Bleid","Comunitat Valenciana","787323",222,197,61);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (241,"Kathleen Puckett",5642,"Jilin","North Island","249455",252,127,26),
  (242,"Kylie Chaney",5113,"Rockingham","Rajasthan","453721",197,152,41),
  (243,"Kasimir Garner",8367,"Palmerston North","Jönköpings län","7428",81,363,85),
  (244,"Tucker Campos",1868,"Quảng Ngãi","Antioquia","410717",177,498,18),
  (245,"Cathleen Humphrey",5758,"Turrialba","Himachal Pradesh","564125",267,407,47),
  (246,"Evelyn Nunez",4764,"Talisay","North-East Region","3602",447,434,45),
  (247,"Dennis Chen",7276,"Serangoon","North Region","32330-32821",328,399,56),
  (248,"Tashya Small",2015,"Ceuta","Munster","064025",209,350,44),
  (249,"Xena Jimenez",4699,"Trollhättan","Guanajuato","P3Q 8EO",104,447,78),
  (250,"Marcia Mcdowell",5230,"Sortland","Zhōngnán","337696",264,27,93);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (251,"Lyle Gibbs",728,"Blieskastel","North Jeolla","24-43",396,237,93),
  (252,"Vincent Baird",3435,"Belfast","Idaho","183265",244,36,18),
  (253,"Thomas Benton",1400,"Sluis","Sląskie","57-762",453,349,16),
  (254,"Kellie Wise",949,"Chortkiv","Drenthe","686850",489,347,84),
  (255,"Nita Aguilar",365,"Dublin","West Java","5819",426,350,75),
  (256,"Tatum Moody",751,"Irapuato","Prince Edward Island","05775",122,447,14),
  (257,"Lars Burnett",6412,"Paulista","Dōngběi","1262",31,53,75),
  (258,"Jameson Donovan",2652,"Lucknow","Louisiana","33-31",446,141,85),
  (259,"Hiroko Moran",8544,"Sichuan","La Libertad","33130",294,273,85),
  (260,"Palmer Jefferson",1279,"Melilla","Hà Nội","43335-14245",136,373,90);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (261,"Veda Wagner",4427,"Pazarcık","Henegouwen","40108",366,467,54),
  (262,"Reece Bullock",3007,"Newmarket","Pays de la Loire","2647-3727",267,215,65),
  (263,"Frances Holloway",4659,"Hải Phòng","Chhattisgarh","747328",88,257,7),
  (264,"Ocean Mitchell",2493,"Söderhamn","Los Lagos","428113",405,378,43),
  (265,"Lee Bowman",9323,"Plato","West Nusa Tenggara","5945",50,113,39),
  (266,"Malachi Vega",5122,"Mandasor","Lai Châu","6524",429,251,50),
  (267,"Keaton Bray",765,"Ashbourne","Paraná","736687",479,6,47),
  (268,"Ina Valencia",7221,"Loppem","Västra Götalands län","721772",467,10,46),
  (269,"September Duke",7835,"Kawerau","Ilocos Region","21000",104,408,91),
  (270,"Cyrus Hayes",9381,"Wals-Siezenheim","Los Ríos","65-38",30,188,29);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (271,"Jenette Wiggins",2095,"Gelsenkirchen","Sumy oblast","495335",178,485,27),
  (272,"Adria Hays",2864,"Palmerston","Cusco","936163",401,78,35),
  (273,"Jason Bryan",4731,"Dovzhansk","Jeju","77332-41862",284,479,95),
  (274,"Irene Garrison",236,"Halesowen","Kostroma Oblast","28-28",137,317,22),
  (275,"Lavinia Dorsey",2774,"Neelum Valley","North Sumatra","88610",27,432,37),
  (276,"Jakeem Blanchard",6742,"Tame","Nunavut","W8H 3RP",59,188,31),
  (277,"Cadman Noble",333,"Deventer","Thái Nguyên","604093",291,88,88),
  (278,"Gavin Mckay",7950,"Bago","Dōngběi","7625",169,441,98),
  (279,"Daniel Wilson",1004,"Juazeiro","Michoacán","8423",15,441,33),
  (280,"Aimee Dillard",1019,"Nevers","Oslo","50204",490,33,64);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (281,"Simone Clay",6448,"Morro d'Alba","Radnorshire","7837",16,319,72),
  (282,"Phillip Calhoun",9039,"Juliaca","Aisén","6873",287,157,84),
  (283,"Laith Owens",2411,"Gjoa Haven","Liguria","374418",425,482,64),
  (284,"Amery Sutton",6443,"Sicuani","Katsina","782298",437,171,15),
  (285,"Connor Moon",9856,"Yurimaguas","Riau","4567",478,341,43),
  (286,"Hedy Cameron",7033,"Montenero Val Cocchiara","Mersin","87-907",244,470,48),
  (287,"Zenaida Koch",3183,"Nuevo Laredo","Sakhalin Oblast","7714",316,458,17),
  (288,"Clayton Cote",3347,"Soma","South Island","875827",42,438,24),
  (289,"Phelan Williams",4484,"Palmira","Bahia","11758",367,374,24),
  (290,"Briar Barker",1902,"Trollhättan","Corse","679346",130,106,23);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (291,"Kevyn Merrill",9408,"Tunja","Eastern Visayas","0188 UV",484,300,65),
  (292,"Beck Parsons",6741,"Szczecin","Katsina","6623",89,365,80),
  (293,"Tad Gates",9855,"Dublin","Cajamarca","2102",63,45,4),
  (294,"Audrey Zimmerman",2401,"Salt Lake City","Västra Götalands län","74767-116",183,360,42),
  (295,"Eagan Marshall",8922,"Collines-de-l'Outaouais","Alabama","02721",290,38,72),
  (296,"Alden Richmond",1970,"Imphal","Dalarnas län","U3 1PI",380,488,45),
  (297,"Justina Hicks",8943,"Rosenheim","Huáběi","71158",82,303,34),
  (298,"Zenaida Johnston",9173,"Jiangsu","Anglesey","11478",264,365,58),
  (299,"Neil Welch",4012,"Santa Cruz de Tenerife","Toscana","28-932",155,50,88),
  (300,"Rogan Zamora",555,"Bida","Cusco","22870",435,51,38);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (301,"Travis Lambert",3279,"Oamaru","Leinster","557235",487,99,89),
  (302,"Joelle Clark",7276,"Barranco Minas","Małopolskie","57829",305,176,30),
  (303,"Hector Good",9483,"Villa Cortese","Junín","559565",463,492,88),
  (304,"Howard Knight",6186,"Gunsan","Los Ríos","7223 HI",391,101,79),
  (305,"Marah Anthony",9981,"Olmué","Adana","4411",404,341,19),
  (306,"Deborah Chaney",7598,"Åkersberga","East Region","2755",406,285,96),
  (307,"Rooney Freeman",3484,"Lidköping","Pennsylvania","35314057",268,36,60),
  (308,"Jenette Becker",4107,"Lelystad","North Island","15W 3W6",184,142,31),
  (309,"Maisie Cherry",2997,"Purnea","Munster","5556",105,296,94),
  (310,"Wyatt Haney",6063,"Iquitos","Bremen","E5 2WX",353,94,48);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (311,"Wallace Valencia",9966,"Lutsel K'e","Lai Châu","4424",206,183,24),
  (312,"Phillip Bray",9061,"Tokoroa","Pará","647757",500,262,39),
  (313,"Jasper Byrd",8933,"Amsterdam","Jönköpings län","644871",496,413,54),
  (314,"Nehru Carr",7253,"Queenstown","Cherkasy oblast","978178",396,162,74),
  (315,"Fitzgerald Lawrence",775,"San Jose del Monte","Gangwon","67-34",399,477,81),
  (316,"Francis Owen",5529,"La Ligua","Arauca","186853",101,302,57),
  (317,"Paula Ortega",5781,"Cork","Dōngběi","2134",498,124,11),
  (318,"Cairo Britt",827,"Vetlanda","Nottinghamshire","1587",357,117,18),
  (319,"Channing Kane",8189,"Charlottetown","Bourgogne","331346",432,403,19),
  (320,"Kevyn Massey",5094,"Phan Rang–Tháp Chàm","Gilgit Baltistan","7777",382,434,69);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (321,"Hope Bender",4569,"Irpin","Podlaskie","81313",424,244,86),
  (322,"Britanney Eaton",9614,"Orroli","Noord Brabant","86185",422,315,48),
  (323,"Lareina Church",2155,"Knoxville","South Island","66874",464,306,80),
  (324,"Rhonda Guerrero",4099,"Cork","North Gyeongsang","S65 1GW",118,414,78),
  (325,"Griffin Gilbert",9096,"Caxias","Gorontalo","6302",25,453,56),
  (326,"Jackson Mckay",4804,"Kingston","Khánh Hòa","81-58",397,254,88),
  (327,"Idona Lucas",4024,"Sacheon","Delta","25887",430,256,41),
  (328,"Ezra Cline",2158,"Hof","Antioquia","46290",197,348,82),
  (329,"Kathleen Clements",4203,"Bad Dürkheim","Inverness-shire","7984",233,254,47),
  (330,"Brian Randolph",9126,"Vallentuna","Samara Oblast","182623",78,217,98);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (331,"Tashya Morton",1724,"Pereira","South Island","81S 6S4",88,275,72),
  (332,"Kelly Briggs",8981,"Heilongjiang","Kirov Oblast","780717",16,218,16),
  (333,"Lawrence Gaines",4950,"Lelystad","Styria","31463",363,231,13),
  (334,"Christopher Schwartz",3746,"Okene","Rio de Janeiro","7341",144,374,29),
  (335,"Elvis Tucker",8458,"Calle Blancos","Morelos","16397",243,213,78),
  (336,"Whilemina Velez",5936,"Märsta","Opolskie","80395",362,420,16),
  (337,"Chantale Macdonald",6006,"Frutillar","Loreto","5668",281,292,33),
  (338,"Tyrone Colon",3483,"Cork","Berlin","24680",227,145,59),
  (339,"Garth Horton",1327,"Criciúma","Balochistan","66118-246",151,324,15),
  (340,"Donna Heath",8916,"Iowa City","Carinthia","919509",130,19,82);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (341,"Carl Koch",6359,"İslahiye","Navarra","4631 DC",48,450,19),
  (342,"Eleanor Marks",9068,"Heredia","Mazowieckie","RT5 7CS",116,346,19),
  (343,"Zane Byers",73,"Ukkel","Buckinghamshire","168914",262,157,58),
  (344,"Nasim Walters",2375,"Guadalupe","Burgenland","1112-0712",128,168,56),
  (345,"Whilemina Farrell",9911,"Naarden","Alajuela","UH94 0NR",33,151,43),
  (346,"Dominique Sweet",6516,"Solok","Araucanía","8820 BZ",48,420,83),
  (347,"Lavinia Hunt",2302,"Nantes","Belgorod Oblast","84169",400,51,41),
  (348,"Ima Moon",5229,"Palma de Mallorca","Đồng Nai","215278",102,306,27),
  (349,"Dane Buck",568,"Pasir Ris","Lima","53-82",228,492,13),
  (350,"Neil Edwards",1883,"Batangas City","Borno","40202",337,441,6);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (351,"Maggy Duncan",8440,"Municipal District","Namen","34058",42,104,82),
  (352,"Quinn Parsons",351,"Zhob","Ulster","56412",337,329,81),
  (353,"David Cameron",5990,"Las Piñas","Pará","738652",189,79,71),
  (354,"Shay Rosales",1966,"Vladimir","Delta","593044",85,254,90),
  (355,"Quintessa Kerr",6305,"San Francisco","Şanlıurfa","38777",40,201,43),
  (356,"Leigh Hancock",5843,"Sint-Pieters-Woluwe","North Gyeongsang","70754-35822",121,349,83),
  (357,"Kameko Acevedo",8285,"Puerto Nariño","Cajamarca","72144",134,60,46),
  (358,"Nita Mccoy",8321,"Guadalajara","Nordland","8468",253,175,90),
  (359,"Jameson Cross",6984,"Puntarenas","Loreto","16781",354,153,95),
  (360,"Kai Massey",8811,"Bischofshofen","South Island","843582",342,234,61);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (361,"Forrest Rivera",7275,"San Pablo","Aragón","71251",411,299,59),
  (362,"Melvin Duke",1013,"Christchurch","Limpopo","511152",373,126,87),
  (363,"Ryder Baxter",7565,"Porvenir","Central Sulawesi","3156",23,43,63),
  (364,"Zoe Estrada",3590,"Oleksandriia","Trøndelag","40310",146,294,56),
  (365,"Dorian Wagner",8118,"Ensenada","North Jeolla","738132",185,364,82),
  (366,"Bell Patton",9012,"Grahamstown","Samsun","682891",79,372,89),
  (367,"Kamal Hubbard",5587,"Pınarbaşı","Brandenburg","6874",178,76,96),
  (368,"Avram Branch",5813,"Kotli","Sląskie","51818",171,47,97),
  (369,"Stacey Vang",9704,"La Rochelle","Zeeland","50704",416,250,90),
  (370,"Julie Collier",4508,"Valparai","Zeeland","35660",9,221,51);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (371,"Joshua Johns",5745,"Oryol","Oslo","43897",111,94,97),
  (372,"Ruby Castillo",370,"Shimanovsk","Victoria","2395",455,440,37),
  (373,"Leigh Cervantes",3318,"Innsbruck","Vorarlberg","2627",460,329,23),
  (374,"Odessa Cook",8578,"Mâcon","Nunavut","T8P 7V3",325,316,39),
  (375,"Mannix Robles",9506,"Guangdong","South Jeolla","778524",286,116,21),
  (376,"Tana Peters",4701,"Ludvika","East Region","458275",348,349,83),
  (377,"Olga Bauer",736,"Agustín Codazzi","Baden Württemberg","226617",483,299,48),
  (378,"Ila Head",2822,"Gangtok","Provence-Alpes-Côte d'Azur","77403",396,302,87),
  (379,"Nigel Hughes",2710,"Wick","Zhōngnán","VC48 9BS",468,120,76),
  (380,"Edan Sheppard",8529,"Ceuta","Central Region","8274",38,306,67);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (381,"Oliver Cline",1449,"Istres","Minas Gerais","67635",371,460,71),
  (382,"Jeanette Wells",6581,"Batangas City","Minas Gerais","237273",99,415,26),
  (383,"Petra Hamilton",6032,"Agartala","Hidalgo","86630",29,346,9),
  (384,"Oleg Cabrera",9477,"Guizhou","Guaviare","35992",463,127,91),
  (385,"Cecilia Todd",270,"Guangdong","Brandenburg","10811",416,78,47),
  (386,"Noelani Maynard",3950,"Starachowice","Delta","855841",40,325,52),
  (387,"Jonas Mcleod",2314,"Swellendam","Cherkasy oblast","121011",74,244,65),
  (388,"Xenos Oliver",6356,"Swabi","Sokoto","05527",52,477,54),
  (389,"Jerome Hammond",9033,"Kediri","Gyeonggi","65063-889",162,495,92),
  (390,"Britanney Hicks",1822,"Rendsburg","Emilia-Romagna","3636",113,328,13);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (391,"Kirby Cross",7711,"Melilla","Tambov Oblast","11-12",25,234,88),
  (392,"Rebecca Todd",9107,"Dalbeattie","Puntarenas","18J 4H5",26,262,28),
  (393,"Ryan Nicholson",7146,"Logroño","Balochistan","XF8R 4WX",169,397,46),
  (394,"Peter Watkins",9606,"Malartic","Ancash","5559",152,172,92),
  (395,"Hammett Knapp",9505,"Lexington","Styria","3475",215,87,27),
  (396,"Sheila Case",8167,"Kuruman","Friuli-Venezia Giulia","81686",418,286,83),
  (397,"Phoebe Aguilar",3762,"Chihuahua","Jambi","W25 6PB",222,275,3),
  (398,"Len Albert",9166,"Huaraz","San José","449268",241,447,24),
  (399,"Herrod Bryan",1783,"Siquirres","East Region","6363",153,255,33),
  (400,"Isadora Rogers",1524,"Okene","Huádōng","7866",11,375,70);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (401,"Macon Barton",608,"Sullana","Henegouwen","8778",249,366,76),
  (402,"Guinevere Ferguson",7356,"Bergen","Jönköpings län","28118",211,358,39),
  (403,"Malachi Holloway",7055,"Saint-Nazaire","Zeeland","8863",78,69,75),
  (404,"Hall Jefferson",56,"Jayapura","Xīnán","8462",199,68,12),
  (405,"Graiden Avila",5939,"Pietermaritzburg","Galicia","89070",287,127,72),
  (406,"Upton Merrill",5611,"Santa Coloma de Gramenet","Puntarenas","H4W 2S1",375,15,22),
  (407,"Rhiannon Manning",3194,"Stjørdalshalsen","California","27109",405,452,9),
  (408,"Ira Bates",3672,"Pontianak","Chhattisgarh","5447",224,174,50),
  (409,"Chadwick Holder",4878,"Drachten","Bangsamoro","460172",481,438,60),
  (410,"Channing Klein",2779,"Galway","Illes Balears","438452",22,82,11);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (411,"Alvin Jacobson",7530,"Versailles","Khyber Pakhtoonkhwa","872497",459,83,7),
  (412,"Alden Gamble",1522,"Lim Chu Kang","Northern Mindanao","06918",35,470,75),
  (413,"Hashim Guy",2842,"Secunda","Saarland","D6Y 2EN",175,270,14),
  (414,"Yardley Cain",6984,"Greymouth","Jönköpings län","W44 8WM",265,470,100),
  (415,"Quon Lee",7858,"Batac","Møre og Romsdal","6062",154,366,10),
  (416,"Clayton Morales",2193,"Cáceres","South Island","8335",44,280,22),
  (417,"Louis Briggs",2205,"Cambridge","Piura","327627",43,99,57),
  (418,"Channing Luna",9441,"Wanganui","Oost-Vlaanderen","00878-56215",398,65,92),
  (419,"Dale Richardson",6371,"Grahamstown","Gangwon","14675",494,385,86),
  (420,"Erasmus Fischer",1534,"Murray Bridge","Norfolk","9347",336,246,73);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (421,"McKenzie Boyer",3448,"Fortaleza","Nordland","43984",117,146,3),
  (422,"Julie Miller",659,"Musina","İzmir","415934",206,182,59),
  (423,"Abbot Mathis",1466,"Banjarmasin","Cartago","359650",300,235,24),
  (424,"Acton Forbes",6774,"Noisy-le-Grand","Arica y Parinacota","50106",390,174,28),
  (425,"Oprah Olson",9141,"Newton Abbot","Vĩnh Phúc","6240",125,39,61),
  (426,"Camilla England",4590,"Kircudbright","Queensland","50448",432,339,83),
  (427,"Lynn Rowe",1291,"Reynosa","Saarland","656514",438,18,63),
  (428,"Colleen Bender",4647,"Oss","South Australia","24428",278,350,82),
  (429,"Rama Dyer",5603,"Lago Verde","Moscow Oblast","83475",391,258,38),
  (430,"Candice Wolf",6903,"Ulundi","Guanajuato","038883",433,333,97);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (431,"Tara Patton",1263,"Itanagar","Innlandet","6490",35,169,65),
  (432,"Nathan Wall",6307,"Cauayan","Morayshire","864722",375,388,28),
  (433,"Mufutau Morin",3503,"Attert","Dalarnas län","865268",322,17,39),
  (434,"Illana Stein",477,"Los Álamos","Şanlıurfa","67623-639",446,431,26),
  (435,"Robin Olson",673,"Alanya","Paraíba","69873",496,50,82),
  (436,"Hu Blevins",7560,"Guadalajara","Central Region","914674",128,134,18),
  (437,"Hayfa Noble",941,"La Dorada","Limousin","02854",134,347,10),
  (438,"Fletcher Newman",7656,"Sichuan","Rivne oblast","81316",165,139,41),
  (439,"Desirae Mack",3207,"Freising","Midi-Pyrénées","1429",48,418,36),
  (440,"Oscar Mcfarland",8812,"Guadalajara","Vorarlberg","79289",30,116,57);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (441,"Jessica Hardin",9332,"Waren","Lombardia","1536 DZ",241,354,59),
  (442,"Macon Williams",638,"Kremenchuk","Antofagasta","451839",120,258,8),
  (443,"Brendan Le",260,"Wagga Wagga","Podkarpackie","E45 4GC",348,428,70),
  (444,"Libby Snyder",4401,"Taltal","Västra Götalands län","33919",164,221,17),
  (445,"Josephine Mills",2260,"Bismil","Staffordshire","2064",463,309,68),
  (446,"Phelan Gonzalez",7347,"Bundaberg","Provence-Alpes-Côte d'Azur","3736",301,235,48),
  (447,"Vladimir Leonard",9303,"Hà Nội","Xīnán","325753",26,441,76),
  (448,"Erica Walker",8222,"Bremerhaven","Bình Định","9838",272,355,99),
  (449,"Erin Hanson",7749,"Lerum","Pará","849117",204,104,64),
  (450,"Petra Lowe",6587,"Bhatinda","Huádōng","7227",380,209,32);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (451,"Giselle Knowles",2101,"Miraflores","Hamburg","651617",447,217,10),
  (452,"Alec Lane",1050,"Norrköping","Valle del Cauca","53-15",488,98,80),
  (453,"Cheryl Pickett",9308,"Quedlinburg","Antofagasta","12612",500,213,2),
  (454,"Prescott Holmes",2622,"Punta Arenas","Kocaeli","2646",390,126,54),
  (455,"Sarah Thornton",4169,"Codó","Bali","42-72",376,163,13),
  (456,"Brenden Mcmillan",5930,"Mastung","Odessa oblast","TO1 4RS",119,90,97),
  (457,"Martin Shelton",7480,"Devonport","Western Cape","779660",38,211,88),
  (458,"Abel Leach",1804,"Jeju","Xīnán","679665",170,393,25),
  (459,"Gavin Barrett",901,"Heikruis","Los Lagos","66137",413,197,60),
  (460,"Bryar Zamora",1542,"Lodine","Canarias","68317",72,346,50);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (461,"Irene Rogers",5589,"Tarrasa","Cartago","882784",214,222,43),
  (462,"Kermit Mccormick",5628,"Borsbeek","Antofagasta","5757",311,457,5),
  (463,"Alyssa Salinas",9544,"Zamora de Hidalgo","Khánh Hòa","T5Y 6M2",338,68,2),
  (464,"Kadeem Robinson",9556,"Tidore","Arequipa","733536",168,75,78),
  (465,"Sybill Atkinson",2244,"Baracaldo","Guainía","61583-257",315,221,63),
  (466,"Imelda Parrish",9260,"Cortil-Noirmont","Lazio","93775-522",115,456,14),
  (467,"Anastasia Todd",3248,"Lambayeque","Massachusetts","18579",196,439,26),
  (468,"Dean Melton",5106,"Ponta Grossa","Veracruz","79265-65547",243,251,58),
  (469,"Sonya Kim",3041,"Montpellier","Basilicata","621831",383,273,2),
  (470,"Gareth Camacho",5930,"Loralai","Västra Götalands län","63853",101,371,62);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (471,"Amber Wiley",6350,"San Francisco","Brandenburg","212773",129,119,95),
  (472,"Orla Wyatt",204,"Limoges","Bắc Kạn","7574",379,202,19),
  (473,"Slade Ellison",645,"Sandviken","Khyber Pakhtoonkhwa","99-37",421,443,58),
  (474,"Christine Harmon",1905,"Villa del Rosario","Luxemburg","587636",448,457,13),
  (475,"Gail Page",5142,"Guadalupe","Leningrad Oblast","7560",182,185,18),
  (476,"William Moran",2932,"Jaén","New South Wales","A0H 2P8",196,72,98),
  (477,"Beau Gamble",6441,"Villahermosa","California","9744",426,297,60),
  (478,"Quinlan Estrada",7920,"Clementi","Antofagasta","6368",378,210,100),
  (479,"Jakeem Murphy",5870,"Florianópolis","Hà Nội","8676",49,205,63),
  (480,"Abbot Garner",2467,"Ningxia","Jambi","58744",455,288,97);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (481,"Walter Singleton",4785,"Heppignies","Nordrhein-Westphalen","484567",424,81,73),
  (482,"Wynter Morrow",4296,"Suwałki","North West","1740-8785",91,13,59),
  (483,"Akeem Wise",5131,"Stewart","Liguria","7932-8111",12,34,2),
  (484,"Ignatius Tyler",2011,"Kungälv","Nordland","02682",172,446,46),
  (485,"Rosalyn Powell",7464,"South Burlington","Møre og Romsdal","57377",206,29,66),
  (486,"Eleanor York",6714,"Saltillo","Michigan","2045",174,326,16),
  (487,"Blaze Guzman",5339,"Greenlaw","Connacht","24344",455,21,77),
  (488,"Chelsea Tillman",7309,"Padre las Casas","Bangsamoro","2553 UN",35,425,5),
  (489,"Phelan Tillman",4671,"Villahermosa","Valparaíso","888341",68,296,94),
  (490,"Gregory Bean",7223,"Alexandra","Canarias","667131",134,280,36);
INSERT INTO `Direccion` (`address_id`,`calle`,`numero`,`ciudad`,`provincia`,`codigo_postal`,`customer_id`,`employee_id`,`branch_id`)
VALUES
  (491,"Regan Cohen",416,"Owerri","Franche-Comté","P9T 8K4",301,446,20),
  (492,"Tatyana Castillo",6778,"Açailândia","Central Region","5784",349,263,100),
  (493,"Rama Rocha",5478,"Colina","Junín","5354",213,457,80),
  (494,"Libby Hudson",6753,"Bagh","Poltava oblast","5886",42,374,40),
  (495,"Paloma O'Neill",6009,"Cork","Free State","70239",385,258,34),
  (496,"Hayfa Mccullough",7993,"Cork","Novgorod Oblast","4264",187,209,58),
  (497,"Travis Cherry",8616,"Galway","Meghalaya","731283",122,271,5),
  (498,"Kareem Cortez",2710,"Ningxia","Maranhão","4648",318,376,98),
  (499,"Brenda Browning",2521,"Suncheon","Veneto","13263",392,300,43),
  (500,"Ignatius Gates",5879,"Soye","Noord Holland","5752",321,259,22);



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

UPDATE Empleado SET employee_hire_date = substr(employee_hire_date, 1, 10);