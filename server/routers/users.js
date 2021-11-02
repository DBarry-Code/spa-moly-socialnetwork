const { getUserByID } = require("../db/db.js");
const { Router } = require("express");
//const bcrypt = require("bcryptjs");

const router = Router();

router.get("/users/me", (req, res) => {
    const { user_id } = req.session;
    getUserByID(user_id).than((user) => {
        if (!user) {
            res.statusCode(401).json({
                message: "User not found!",
            });
        }
        res.json(user);
    });
});

// router.post("/users", (req, res) => {
//     // same as in petition project,
//     // but instead of response.redirect and response.render
//     // you have to use response.json with the appropriate data
//     // again, set the right status (400/500) for every error
//     // and send the right error message
// });

/*
// you can start implementing this stuff already
router.post("/login", (request, response) => ... );
router.post("/logout", (request, response) => ...);
*/
module.exports = router;
