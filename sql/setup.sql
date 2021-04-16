DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments;


CREATE TABLE users (
    username TEXT UNIQUE NOT NULL PRIMARY KEY,
    photo_url TEXT
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    image TEXT,
    caption TEXT NOT NULL,
    tags TEXT[],
    user_id TEXT NOT NULL references users(username) ON DELETE CASCADE
);

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    body TEXT NOT NULL,
    post_id BIGINT NOT NULL references posts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL references users(username) ON DELETE CASCADE
)

