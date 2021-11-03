const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { createUser, getUserById, getUserByEmail } = require("../db.js");

const router = Router();

function checkLogin({ email, password }) {
    return getUserByEmail(email).then((foundUser) => {
        if (!foundUser) {
            return false;
        }
        return bcrypt
            .compare(password, foundUser.password_hash)
            .then((match) => match && foundUser);
    });
}

router.get("/users/me", (request, response) => {
    const { user_id } = request.session;
    getUserById(user_id).then((user) => {
        if (!user) {
            response.status(401).json({ message: "User is not logged in" });
            return;
        }
        response.json(user);
    });
});

router.post("/users", (request, response) => {
    const { email, password, first_name, last_name } = request.body;
    if (!email || !password || !first_name || !last_name) {
        response.status(400).json({
            message: "Please fill out all fields",
        });
        return;
    }
    createUser(request.body)
        .then((createdUser) => {
            request.session.user_id = createdUser.id;
            response.json(createdUser);
        })
        .catch((error) => {
            if (error.constraint === "users_email_key") {
                response.status(400).json({
                    message: "Email already in use",
                });
                return;
            }
            response.status(500).json({
                message: "Server error",
            });
        });
});

router.post("/login", (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.status(401).json({
            message: "Please fill out all fields",
        });
        return;
    }
    checkLogin(request.body).then((user) => {
        if (!user) {
            response.status(401).json({
                message: "Wrong credentials",
            });
            return;
        }
        request.session.user_id = user.id;
        response.json(user);
    });
});

router.post("/logout", (request, response) => {
    request.session.user_id = null;
    response.json({
        message: "Logout successful",
    });
});

module.exports = router;
