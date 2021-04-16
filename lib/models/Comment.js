const pool = require("../utils/pool");

module.exports = class Comment {

    id;
    body;
    postId;
    userId;

    constructor(row) {
        this.id = row.id;
        this.body = row.body;
        this.postId = row.post_id;
        this.userId = row.user_id;
    }

    static async insert({ body, postId, userId }) {
        const { rows } = await pool.query(`
        INSERT INTO comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *;
        `, [body, postId, userId])

        return new Comment(rows[0])
    }

    static async findById(id) {
        const { rows } = await pool.query(`
        SELECT * FROM comments WHERE id = $1
        `, [id])

        if (!rows[0]) throw new Error(`No Comment With ID ${id} Found`)
        return new Comment(rows[0])
    }

    static async delete(id, username) {
        console.log(id, username)
        const { rows } = await pool.query(`
        DELETE FROM comments
        WHERE id = $1 
        AND user_id = $2
        RETURNING *;
        `, [id, username])

        if (!rows[0]) throw new Error(`No Comment With ID ${id} Found`)
        return new Comment(rows[0])
    }
}