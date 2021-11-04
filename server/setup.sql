DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pwreset;

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    password_hash   VARCHAR NOT NULL,
    avatar_url      VARCHAR (255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pwreset (
    email           VARCHAR(50) NOT NULL,
    code            VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);