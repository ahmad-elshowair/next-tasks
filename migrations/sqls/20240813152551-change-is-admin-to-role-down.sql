ALTER Table users
RENAME COLUMN 'role' TO is_admin,
ALTER COLUMN is_admin TYPE BOOLEAN;

-- update the values in the column
UPDATE users
SET
    is_admin = CASE
        WHEN is_admin = 'user' THEN false
        WHEN is_admin = 'admin' THEN true
        ELSE is_admin
    END;