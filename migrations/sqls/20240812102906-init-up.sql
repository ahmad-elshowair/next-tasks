CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    user_id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    image_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
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

INSERT INTO
    users (
        user_id,
        user_name,
        email,
        password,
        image_url
    )
VALUES (
        '7cb379b6-a331-421d-889a-23d83ce6e5dc',
        'Keshawn_Nolan98',
        'Cecilia.Sawayn16@gmail.com',
        '$2a$10$x8t./lIrYvloTKrEE7TLoeFvoEhXaCFn3eo89iJZbSNYICSKsqz.a',
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/72.jpg'
    ),
    (
        '185a59fb-e803-40c4-abc4-240af425a89d',
        'Jazmin34',
        'Jimmy_Marks@hotmail.com',
        '$2a$10$u7gRe2ziKhJ2T.9iasasneXiLoWuIL8g9OQo6Luk.LnLcVZUUvk8G',
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/240.jpg'
    ),
    (
        'f5538e45-8922-4940-82a6-37b0de16d5ad',
        'Astrid.Morar81',
        'Gilbert.Ullrich92@gmail.com',
        '$2a$10$9z9crJIv8YczwNhuF2OtOeTr1hv0sMOGUqI3ZXSzIls2SLhGC/vSC',
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1228.jpg'
    ),
    (
        'c103634e-bc99-45e7-82e2-d2248f8e217d',
        'Quinton48',
        'Eloise_Jerde11@hotmail.com',
        '$2a$10$9jVqgZJDi8IaON71QR6tIuAczYZJnTDE2wvuOI5LRDSCGntUB08M2',
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/502.jpg'
    ),
    (
        '15ffc2b4-8e58-4354-a5cc-42cf565698cc',
        'Nola_Luettgen56',
        'Melissa_Kulas@yahoo.com',
        '$2a$10$OE3Qfl1.Ul1PPKUC5g2LUusPnUi1GEGnE1lb1E1Z3V3Pv6LGJTgCq',
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/999.jpg'
    );

INSERT INTO
    tasks (
        task_id,
        title,
        user_id,
        is_completed
    )
VALUES (
        'a67e875c-cc6b-47a9-a527-0cb73f20baf9',
        'Odit dolor id impedit distinctio placeat voluptate soluta.',
        '7cb379b6-a331-421d-889a-23d83ce6e5dc',
        false
    ),
    (
        '2f415ce0-7ba1-4b6f-972d-6b73669e1bb1',
        'Similique est corporis eum quidem soluta.',
        '185a59fb-e803-40c4-abc4-240af425a89d',
        true
    ),
    (
        'dfec4207-bf23-47bf-b897-d82c63cc4571',
        'Deleniti vitae dolores.',
        '7cb379b6-a331-421d-889a-23d83ce6e5dc',
        true
    ),
    (
        'bbe632db-a01e-4695-93f2-4f8620e996b8',
        'Vel ullam ullam blanditiis corporis odit culpa et quo inventore.',
        '185a59fb-e803-40c4-abc4-240af425a89d',
        false
    ),
    (
        'c5c352ce-3848-4eae-b046-78f05811603d',
        'Error consectetur omnis consequatur quas.',
        'f5538e45-8922-4940-82a6-37b0de16d5ad',
        false
    ),
    (
        '00d6b37e-eb50-4827-8ba5-705eed50d60a',
        'Facilis eius autem.',
        'c103634e-bc99-45e7-82e2-d2248f8e217d',
        false
    ),
    (
        '8155ab7c-3ed6-41f1-8ddd-836c5b7ceb1e',
        'Nemo nesciunt expedita ab illo itaque.',
        'f5538e45-8922-4940-82a6-37b0de16d5ad',
        false
    ),
    (
        '971948a2-e837-4840-8ef7-bbfa1b10fe31',
        'Quo saepe mollitia commodi repellendus quam vel.',
        'c103634e-bc99-45e7-82e2-d2248f8e217d',
        true
    ),
    (
        'a039d74f-ca63-4dcd-9256-f5b110227000',
        'Nisi quidem cupiditate odit nulla unde hic eius expedita.',
        '15ffc2b4-8e58-4354-a5cc-42cf565698cc',
        true
    ),
    (
        'bc58a2aa-9d74-4c46-8326-873960babe8a',
        'Alias nemo vitae eius asperiores unde officia aut.',
        '15ffc2b4-8e58-4354-a5cc-42cf565698cc',
        true
    );