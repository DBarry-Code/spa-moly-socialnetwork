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

// function getRecentUsers({ limit }) {
//     return db
//         .query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1", [limit])
//         .then((result) => result.rows);
// }

function getRecentUsers(limit, number) {
    return db
        .query("SELECT * FROM users WHERE id >= $2 LIMIT $1", [limit, number])
        .then((result) => result.rows);
}

function searchUsers({ q }) {
    return db
        .query(
            "SELECT * FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1",
            [`${q}%`]
        )
        .then((result) => result.rows);
}

function getFriendship(first_id, second_id) {
    return db
        .query(
            `
        SELECT *
        FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
        `,
            [first_id, second_id]
        )
        .then((result) => result.rows[0]);
}

function createFriendship(sender_id, recipient_id) {
    return db
        .query(
            `
        INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING *
        `,
            [sender_id, recipient_id]
        )
        .then((result) => result.rows[0]);
}

function acceptFriendship(sender_id, recipient_id) {
    return db
        .query(
            `
        UPDATE friendships
        SET accepted = true
        WHERE sender_id = $1
        AND recipient_id = $2
            `,
            [sender_id, recipient_id]
        )
        .then((result) => result.rows[0]);
}

function deleteFriendship(first_id, second_id) {
    return db
        .query(
            `
        DELETE FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
        `,
            [first_id, second_id]
        )
        .then((result) => result.rows[0]);
}

function getFriendships(user_id) {
    return db
        .query(
            `
            SELECT friendships.accepted, friendships.id AS friendship_id, users.*
            FROM friendships
            JOIN users
            ON (users.id = friendships.sender_id AND friendships.recipient_id = $1)
            OR (users.id = friendships.recipient_id AND friendships.sender_id = $1 AND accepted = true)
            `,
            [user_id]
        )
        .then((result) => result.rows);
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
    getRecentUsers,
    searchUsers,
    getFriendship,
    createFriendship,
    acceptFriendship,
    deleteFriendship,
    getFriendships,
};
