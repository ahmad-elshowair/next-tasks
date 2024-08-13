-- rename the column and change its datatype to string
ALTER Table users RENAME COLUMN is_admin TO role;

ALTER Table users ALTER COLUMN role TYPE VARCHAR(20);

-- update the values in the column
UPDATE users
SET role = CASE
    WHEN role = 'false' THEN 'user'
    WHEN role = 'true' THEN 'admin'
    ELSE role
END;