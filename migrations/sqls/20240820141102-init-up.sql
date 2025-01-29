CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    user_id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    image_url TEXT DEFAULT '',
    role VARCHAR DEFAULT 'user',
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW(),
    CONSTRAINT fk_user_id_tasks FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);
