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
}