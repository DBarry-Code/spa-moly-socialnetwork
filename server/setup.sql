DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pwreset;
DROP TABLE IF EXISTS friendships;

DROP TABLE IF EXISTS chat_messages;

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    password_hash   VARCHAR NOT NULL,
    avatar_url      VARCHAR (255),
    bio             TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pwreset (
    email           VARCHAR(50) NOT NULL,
    code            VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id              SERIAL PRIMARY KEY,
    sender_id       INT REFERENCES users(id) NOT NULL,
    recipient_id    INT REFERENCES users(id) NOT NULL,
    accepted        BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_messages (
    id              SERIAL PRIMARY KEY,
    sender_id       INT REFERENCES users(id) NOT NULL,
    text            TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);