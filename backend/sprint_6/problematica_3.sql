-- Tercera Problematica

SELECT * FROM Cuenta WHERE balance < 0;

SELECT customer_name, customer_surname, (strftime('%Y', 'now') - strftime('%Y', customer_dob)) AS edad
FROM Cliente 
WHERE customer_surname LIKE '%Z%' OR customer_surname LIKE '%z%';

SELECT c.customer_name, c.customer_surname, (strftime('%Y', 'now') - strftime('%Y', c.customer_dob)) AS edad, s.branch_name 
FROM Cliente c 
JOIN Sucursal s ON c.branch_id = s.branch_id 
WHERE c.customer_name = 'Brendan' 
ORDER BY s.branch_name;

SELECT * FROM Prestamo WHERE loan_total > (SELECT AVG(loan_total) FROM Prestamo);

SELECT COUNT(*) AS cantidad_clientes FROM Cliente WHERE (strftime('%Y', 'now') - strftime('%Y', customer_dob)) < 50;