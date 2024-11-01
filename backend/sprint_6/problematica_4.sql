-- Cuarta Problematica

SELECT s.branch_name, COUNT(c.customer_id) AS cantidad_clientes 
FROM Sucursal s 
JOIN Cliente c ON s.branch_id = c.branch_id 
GROUP BY s.branch_name 
ORDER BY cantidad_clientes DESC;

-- Cantidad de empleados por cliente por sucursal
SELECT 
    s.branch_id, 
    s.branch_name, 
    COALESCE(e.emp_count, 0) AS 'Cantidad empleados', -- SI no hay empleados asigna 0
    COALESCE(c.cust_count, 0) AS 'Cantidad Clientes',
    CASE WHEN COALESCE(c.cust_count, 0) > 0 THEN COALESCE(e.emp_count, 0) / COALESCE(c.cust_count, 0) -- Esto evita que no haya problemas en divisones por 0
         ELSE NULL
    END AS 'Cantidad de empleados por cliente'
FROM 
    sucursal s
LEFT JOIN 
    (SELECT branch_id, COUNT(employee_id) AS emp_count FROM empleado GROUP BY branch_id) e 
ON s.branch_id = e.branch_id
LEFT JOIN 
    (SELECT branch_id, COUNT(customer_id) AS cust_count FROM cliente GROUP BY branch_id) c 
ON s.branch_id = c.branch_id;

-- Obtener la cantidad de tarjetas de crédito por tipo por sucursal
SELECT 
    s.branch_id,
    s.branch_name,
    COUNT(t.card_id) AS 'Cantidad de tarjetas de crédito'
FROM
    sucursal s
LEFT JOIN 
    cliente c ON c.branch_id = s.branch_id
LEFT JOIN
    tarjeta t ON c.customer_id = t.customer_id
LEFT JOIN
    Tipo_Tarjeta tt ON tt.card_type_id = t.tipo
WHERE 
    tt.card_type_name = 'credito'
GROUP BY
    s.branch_id, s.branch_name;

-- Obtener el promedio de créditos otorgado por sucursal
SELECT 
    s.branch_id,
    s.branch_name,
    AVG(p.loan_total) AS 'Promedio de crédito otorgado'
FROM 
    sucursal s
LEFT JOIN 
    cliente c ON c.branch_id = s.branch_id
LEFT JOIN 
    prestamo p ON c.customer_id = p.customer_id
GROUP BY 
    s.branch_id, s.branch_name;

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