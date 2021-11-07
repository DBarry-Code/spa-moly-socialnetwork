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

function updateUserBio({ bio, id }) {
    return db
        .query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING *`, [bio, id])
        .then((result) => result.rows[0]);
}

function insertResetCode(email, code) {
    return db
        .query("INSERT INTO pwreset (email, code) VALUES($1, $2) RETURNING *", [
            email,
            code,
        ])
        .then((result) => result.rows[0]);
}

function checkResetCode({ email, code }) {
    console.log(email, code);
    return db
        .query(
            `
    SELECT * FROM pwreset
    WHERE email = $1
    AND code = $2
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    `,
            [email, code]
        )
        .then((result) => result.rows[result.rows.length - 1]);
}

function updatePassword({ password, email }) {
    console.log("DB mail , Pass:", password, email);

    return hash(password).then((password_hash) => {
        return db
            .query(
                `
                UPDATE users
                SET password_hash = $1
                WHERE email = $2
                RETURNING *`,
                [password_hash, email]
            )
            .then((result) => result.rows[0]);
    });
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateAvatar,
    updateUserBio,
    insertResetCode,
    checkResetCode,
    updatePassword,
};
