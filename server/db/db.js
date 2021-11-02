const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");

/*
const db = spicedPg(getDatabaseURL());

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const { db_user, db_key, db_name } = require("../../secrets.json");
    return `postgres:${db_user}:${db_key}@localhost:5432/${db_name}`;
}
*/

const db = spicedPg("postgres:postgres:d.barry81@localhost:5432/socialnetwork");

//TODO: own fuction!
function hash(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}
//--

function getUserByID(user_id) {
    //console.log(userID);
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [user_id])
        .then((result) => result.rows);
}

function createUser({ first_name, last_name, email, password }) {
    return hash(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (first_name, last_name, email, password_hash) VALUES($1, $2, $3, $4)
            RETURNING *`,
                [first_name, last_name, email, password_hash]
            )
            .then((result) => result.rows[0]);
    });
}

module.exports = {
    getUserByID,
    createUser,
};
