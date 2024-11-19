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

-- Consideramos primeras cuentas como las que tengan id más chico.
SELECT * from Cuenta WHERE balance > 8000
order by account_id limit 5;

SELECT * FROM prestamo
WHERE strftime('%m', loan_date) IN ('04', '06', '08')
order by loan_total;

select loan_type, sum(loan_total) as 'loan_total_accu' from prestamo
group by loan_type