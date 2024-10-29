-- Consultas para generar los reportes solicitados en el sprint.

-- Primera Problematica

CREATE TABLE Tipo_Cliente (type_id INTEGER PRIMARY KEY, type_name TEXT NOT NULL);
CREATE TABLE Tipo_Cuenta (account_type_id INTEGER PRIMARY KEY, account_type_name TEXT NOT NULL);
CREATE TABLE Marca_Tarjeta (brand_id INTEGER PRIMARY KEY, brand_name TEXT NOT NULL);

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



-- Segunda Problematica

CREATE VIEW vista_cliente AS
SELECT customer_id, branch_id, customer_name, customer_surname, customer_DNI,
       (strftime('%Y', 'now') - strftime('%Y', customer_dob)) AS edad
FROM Cliente;

SELECT * FROM vista_cliente WHERE customer_name IN ('Anne', 'Tyler') ORDER BY edad;

INSERT INTO Cliente (customer_name, customer_surname, customer_DNI, branch_id, customer_dob) VALUES
('Lois', 'Stout', '47730534', 80, '1984-07-07'),
('Hall', 'Mcconnell', '52055464', 45, '1968-04-30'),
('Hilel', 'Mclean', '43625213', 77, '1993-03-28'),
('Jin', 'Cooley', '21207908', 96, '1959-08-24'),
('Gabriel', 'Harmon', '57063950', 27, '1976-04-01');


UPDATE Cliente SET branch_id = 10 WHERE customer_DNI IN ('47730534', '52055464', '43625213', '21207908', '57063950');

DELETE FROM Cliente WHERE customer_name = 'Noel' AND customer_surname = 'David';

SELECT loan_type FROM Prestamo ORDER BY loan_total DESC LIMIT 1;

-- Tercera Problematica

SELECT * FROM Cuenta WHERE balance < 0;

SELECT customer_name, customer_surname, (strftime('%Y', 'now') - strftime('%Y', customer_dob)) AS edad
FROM Cliente 
WHERE customer_surname LIKE '%Z%';

SELECT c.customer_name, c.customer_surname, (strftime('%Y', 'now') - strftime('%Y', c.customer_dob)) AS edad, s.branch_name 
FROM Cliente c 
JOIN Sucursal s ON c.branch_id = s.branch_id 
WHERE c.customer_name = 'Brendan' 
ORDER BY s.branch_name;

SELECT * FROM Prestamo WHERE loan_total > (SELECT AVG(loan_total) FROM Prestamo);

SELECT COUNT(*) AS cantidad_clientes FROM Cliente WHERE (strftime('%Y', 'now') - strftime('%Y', customer_dob)) < 50;



-- Cuarta Problematica

SELECT s.branch_name, COUNT(c.customer_id) AS cantidad_clientes 
FROM Sucursal s 
JOIN Cliente c ON s.branch_id = c.branch_id 
GROUP BY s.branch_name 
ORDER BY cantidad_clientes DESC;

CREATE TABLE auditoria_cuenta (
    old_id INTEGER,
    new_id INTEGER,
    old_balance REAL,
    new_balance REAL,
    old_iban TEXT,
    new_iban TEXT,
    old_type TEXT,
    new_type TEXT,
    user_action TEXT,
    created_at TEXT DEFAULT (DATETIME('now'))
);

CREATE TRIGGER after_update_cuenta
AFTER UPDATE OF balance ON Cuenta
BEGIN
    INSERT INTO auditoria_cuenta (old_id, new_id, old_balance, new_balance, user_action, created_at)
    VALUES (old.account_id, new.account_id, old.balance, new.balance, 'update', DATETIME('now'));
END;

