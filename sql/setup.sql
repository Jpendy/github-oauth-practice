DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    github_username TEXT UNIQUE NOT NULL PRIMARY KEY,
    github_photo_url TEXT
)