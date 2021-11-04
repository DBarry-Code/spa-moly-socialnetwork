const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");

const db = spicedPg(getDatabaseURL());

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const { db_user, db_key, db_name } = require("./secrets.json");
    return `postgres:${db_user}:${db_key}@localhost:5432/${db_name}`;
}

const hash = (password) =>
    bcrypt.genSalt().then((salt) => bcrypt.hash(password, salt));

function createUser({ first_name, last_name, email, password }) {
    return hash(password).then((password_hash) => {
        return db
            .query(
                `
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
                [first_name, last_name, email, password_hash]
            )
            .then((result) => result.rows[0]);
    });
}

function getUserById(id) {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then((result) => result.rows[0]);
}

function getUserByEmail(email) {
    return db
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then((result) => result.rows[0]);
}

function updateAvatar({ avatar_url, id }) {
    return db
        .query(
            `UPDATE users
            SET avatar_url = $1
            WHERE id = $2
            RETURNING *`,
            [avatar_url, id]
        )
        .then((result) => result.rows[0]);
}

module.exports = { createUser, getUserById, getUserByEmail, updateAvatar };
