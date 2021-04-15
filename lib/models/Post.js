const pool = require("../utils/pool");
const Comment = require("./Comment");

module.exports = class Post {

    id;
    image;
    caption;
    tags;
    userId;

    constructor(row) {
        this.id = row.id;
        this.image = row.image;
        this.caption = row.caption;
        this.tags = row.tags;
        this.userId = row.user_id;
    }

    static async insert({ image, caption, tags, userId }) {
        const { rows } = await pool.query(`
        INSERT INTO posts (image, caption, tags, user_id)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [image, caption, tags, userId])

        return new Post(rows[0])
    }

    static async find() {
        const { rows } = await pool.query(`
        SELECT posts.*, json_agg(comments) as comments 
        FROM posts
        LEFT JOIN COMMENTS
        ON posts.id = comments.post_id
        GROUP BY posts.id
        `, [])

        return rows.map(row => {
            return {
                ...new Post(row),
                comments: row.comments.map(comment => new Comment(comment))
            }
        })
    }

    static async findById(id) {
        const { rows } = await pool.query(`
        SELECT posts.*, json_agg(comments) as comments 
        FROM posts
        LEFT JOIN COMMENTS
        ON posts.id = comments.post_id
        WHERE posts.id = $1
        GROUP BY posts.id
        `, [id])

        if (!rows[0]) throw new Error(`No Post With ID ${id} Found`)

        console.log(rows[0])
        return {
            ...new Post(rows[0]),
            comments: rows[0].comments.map(comment => new Comment(comment))
        }
    }

    static async update(id, { image, caption, tags, userId }) {
        console.log(id, userId)
        const { rows } = await pool.query(`
        UPDATE posts
        SET image = $1,
        caption = $2,
        tags = $3
        WHERE id = $4
        AND user_id = $5
        RETURNING *;
        `, [image, caption, tags, id, userId])

        if (!rows[0]) throw new Error(`No Post With ID ${id} Found`)
        return new Post(rows[0])
    }

    static async delete(id, username) {
        const { rows } = await pool.query(`
        DELETE FROM posts
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
        `, [id, username])

        if (!rows[0]) throw new Error(`No Post With ID ${id} Found`)
        return new Post(rows[0])
    }
}