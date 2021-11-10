import { useState, useEffect } from "react";

function buttonfriendship({ id }) {
    const [buttonText, setButtonText] = useState("...");
    const [existing, setExisting] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [incoming, setIncoming] = useState(false);

    useEffect(() => {
        fetch("/api/friendships/" + id).then((response) => {
            response.json().then((friendship) => {
                console.log(friendship);
                setExisting(true);
                setAccepted(friendship.accepted);
                console.log(friendship.recipient_id);
                setIncoming(friendship.sender_id === id);
                return;
            });
        });
    }, []);

    useEffect(() => {
        if (!existing) {
            setButtonText("Send friend request");
            return;
        }
        if (accepted) {
            setButtonText("Unfriend");
            return;
        }
        if (incoming) {
            setButtonText("Accept friend request");
            return;
        }
        if (!incoming) {
            setButtonText("Wait for accept");
            return;
        }
    }, [existing, accepted, incoming]);

    function onClick() {
        if (!existing) {
            fetch(`/api/friendships/${id}`, { method: "POST" }).then(
                (response) => {
                    if (response.status === 200) {
                        setExisting(true);
                    }
                }
            );
            return;
        }
        if (incoming && !accepted) {
            fetch(`/api/friendships/${id}`, { method: "PUT" }).then(
                (response) => {
                    if (response.status === 200) {
                        setAccepted(true);
                    }
                }
            );
            return;
        }
        if (accepted) {
            fetch(`/api/friendships/${id}`, { method: "DELETE" }).then(
                (response) => {
                    if (response.status === 200) {
                        setExisting(false);
                    }
                }
            );
            return;
        }
    }

    return (
        <>
            <button onClick={onClick} className="btn btn-primary follow">
                {buttonText}
            </button>
        </>
    );
}

export default buttonfriendship;
