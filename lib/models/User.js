const pool = require("../utils/pool");

module.exports = class User {

    username;
    photoUrl;

    constructor(row) {
        this.username = row.github_username;
        this.photoUrl = row.github_photo_url;
    }

    static async insert({ username, photoUrl }) {
        const { rows } = await pool.query(`
        INSERT INTO users (github_username, github_photo_url) VALUES ($1, $2) 
        ON CONFLICT (github_username) DO UPDATE 
        SET github_photo_url = $2 
        returning *;
        `, [username, photoUrl])

        return new User(rows[0])
    }

}