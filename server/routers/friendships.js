const { Router } = require("express");
const {
    getFriendship,
    createFriendship,
    acceptFriendship,
    deleteFriendship,
} = require("../db.js");

const router = Router();

router.get("/friendships/:other_id", async (req, res) => {
    const first_id = req.session.user_id;
    const second_id = req.params.other_id;

    try {
        const friendship = await getFriendship(first_id, second_id);
        res.json(friendship);
    } catch (error) {
        console.log("Error getFriendship", error);
        res.status(500).json({
            message: "Error get Friends",
        });
    }
});

router.post("/friendships/:recipient_id", async (req, res) => {
    const sender_id = req.session.user_id;
    const recipient_id = req.params.recipient_id;

    try {
        const friendship = await createFriendship(sender_id, recipient_id);
        res.json(friendship);
    } catch (error) {
        console.log("Error createFriendship:", error);
        res.status(500).json({
            message: "Error create friendship",
        });
    }
});

router.put("/friendships/:sender_id", async (req, res) => {
    const sender_id = req.params.sender_id;
    const recipient_id = req.session.user_id;

    try {
        const friendship = await acceptFriendship(sender_id, recipient_id);
        res.json(friendship);
    } catch (error) {
        res.status(500).json({
            message: "Error accept friendship",
        });
    }
});

router.delete("/friendships/:other_id", async (req, res) => {
    const first_id = req.session.user_id;
    const second_id = req.params.other_id;

    try {
        const friendship = await deleteFriendship(first_id, second_id);
        res.json(friendship);
    } catch (error) {
        res.status(500).json({
            message: "Error delete friendship",
        });
    }
});

module.exports = router;
