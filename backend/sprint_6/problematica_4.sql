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