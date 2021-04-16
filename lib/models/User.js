const pool = require("../utils/pool");

module.exports = class User {

    username;
    photoUrl;

    constructor(row) {
        this.username = row.username;
        this.photoUrl = row.photo_url;
    }

    static async insert({ username, photoUrl }) {
        const { rows } = await pool.query(`
        INSERT INTO users (username, photo_url) VALUES ($1, $2) 
        ON CONFLICT (username) DO UPDATE 
        SET photo_url = $2 
        returning *;
        `, [username, photoUrl])

        return new User(rows[0])
    }

}