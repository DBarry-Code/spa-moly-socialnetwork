const { Router } = require("express");
const {
    getFriendship,
    createFriendship,
    acceptFriendship,
    deleteFriendship,
    getFriendships,
} = require("../db.js");

const router = Router();

function serializeFriendship(friendship) {
    return {
        friendship_id: friendship.friendship_id,
        user_id: friendship.id,
        accepted: friendship.accepted,
        first_name: friendship.first_name,
        last_name: friendship.last_name,
        avatar_url: friendship.avatar_url,
        email: friendship.email,
        bio: friendship.bio,
    };
}

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

router.get("/friendships", async (req, res) => {
    const { user_id } = req.session;
    try {
        const friendships = await getFriendships(user_id);
        res.json(friendships.map(serializeFriendship));
    } catch (error) {
        console.log("Error get Frendships", error);
        res.status(500).json({
            message: "Somethig went wrong getting frendship",
        });
    }
});

module.exports = router;
