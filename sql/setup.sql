DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments;


CREATE TABLE users (
    github_username TEXT UNIQUE NOT NULL PRIMARY KEY,
    github_photo_url TEXT
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    image TEXT,
    tags TEXT[],
    caption TEXT NOT NULL,
    user_id TEXT NOT NULL references users(github_username) 
);

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    body TEXT NOT NULL,
    post_id BIGINT NOT NULL references posts(id),
    user_id TEXT NOT NULL references users(github_username)
)