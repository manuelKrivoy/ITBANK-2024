-- Segunda Problematica

CREATE VIEW vista_cliente AS
SELECT customer_id, branch_id, customer_name, customer_surname, customer_DNI,
       (strftime('%Y', 'now') - strftime('%Y', customer_dob)) AS edad
FROM Cliente;

SELECT * FROM vista_cliente WHERE edad > 40 ORDER BY customer_DNI;

SELECT * FROM vista_cliente WHERE customer_name IN ('Anne', 'Tyler') ORDER BY edad;

INSERT INTO Cliente (customer_name, customer_surname, customer_DNI, branch_id, customer_dob) VALUES
('Lois', 'Stout', '47730534', 80, '1984-07-07'),
('Hall', 'Mcconnell', '52055464', 45, '1968-04-30'),
('Hilel', 'Mclean', '43625213', 77, '1993-03-28'),
('Jin', 'Cooley', '21207908', 96, '1959-08-24'),
('Gabriel', 'Harmon', '57063950', 27, '1976-04-01');
SELECT * FROM Cliente 
ORDER BY customer_id DESC LIMIT 5;


UPDATE Cliente SET branch_id = 10 WHERE customer_DNI IN ('47730534', '52055464', '43625213', '21207908', '57063950');

DELETE FROM Cliente WHERE customer_name = 'Noel' AND customer_surname = 'David';

SELECT loan_type FROM Prestamo ORDER BY loan_total DESC LIMIT 1;