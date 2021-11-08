const { Router } = require("express");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("../SES");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { s3Url } = require("../config.json");
const { upload } = require("../S3");
const {
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
} = require("../db.js");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

const router = Router();

if (process.env.NODE_ENV == "production") {
    router.use((request, response, next) => {
        request.headers["x-forwarded-proto"].startsWith("https")
            ? next()
            : response.redirect(`https://${request.hostname}${request.url}`);
    });
}

function serializeUser(user) {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
        bio: user.bio,
    };
}

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

router.post(
    "/users/me/avatar",
    uploader.single("avatar"),
    upload,
    (request, response) => {
        const { user_id } = request.session;
        const { filename } = request.file;
        const avatar_url = s3Url + filename;
        updateAvatar({ avatar_url, id: user_id })
            .then((user) => response.json(serializeUser(user)))
            .catch((error) => {
                console.log("[post /upload error]", error);
                response.sendStatus(500);
            });
    }
);

router.post("/password/reset/start", async (req, res) => {
    const secretCode = cryptoRandomString({
        length: 6,
    });

    //! Errors Handling ? more try catch?
    try {
        const user = await getUserByEmail(req.body.email);
        const inserCode = await insertResetCode(user.email, secretCode);
        console.log("InsertCode", inserCode);
        const email = inserCode.email;
        const code = inserCode.code;
        // eslint-disable-next-line no-unused-vars
        const mail = await sendEmail(email, code);
        res.json(serializeUser(user));
    } catch (error) {
        return res.status(401).json({
            message: "NO USER FOUND",
        });
    }
});

router.post("/password/reset/comfirm", async (req, res) => {
    //!Errors Hanling
    try {
        // eslint-disable-next-line no-unused-vars
        const checkCode = await checkResetCode({ ...req.body });
        const updateNewPasword = await updatePassword({ ...req.body });
        res.json(serializeUser(updateNewPasword));
    } catch (error) {
        return res.status(401).json({
            message: "Wrong CODE",
        });
    }
});

router.get("/users/recent", async (req, res) => {
    const fake_id = Math.floor(Math.random() * 200) + 1;
    const { limit } = req.query;

    try {
        const users = await getRecentUsers(limit, fake_id);
        res.json(users.map(serializeUser));
    } catch (error) {
        console.log("Error geting Recent users", error);
        res.status(500).json({
            message: "Error geting Recent users",
        });
    }
});

router.get("/users/search", async (req, res) => {
    try {
        const users = await searchUsers(req.query);
        res.json(users);
    } catch (error) {
        console.log("Error searching users", error);
        res.status(500).json({
            message: "Error searching users",
        });
    }
});

router.post("/users/me/bio", async (req, res) => {
    const { user_id } = req.session;

    try {
        const user = await updateUserBio({ ...req.body, id: user_id });
        res.json(serializeUser(user));
    } catch (error) {
        console.log("error:express[update Bio]", error);
        res.sendStatus(500);
    }
});

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

router.post("/reset", (request, response) => {
    const { email } = request.body;

    if (!email) {
        response.status(401).json({
            message: "Please fill out all fields",
        });
    }
});

router.post("/reset/comfirm", (request, response) => {
    const { password, code } = request.body;

    if (!password || !code) {
        response.status(401).json({
            message: "Please fill out all fields",
        });
    }
});

module.exports = router;
