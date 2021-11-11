import { useState, useEffect } from "react";

function buttonfriendship({ id }) {
    const [buttonText, setButtonText] = useState("...");
    const [existing, setExisting] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [incoming, setIncoming] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState({});

    useEffect(() => {
        (async () => {
            try {
                console.log(id);
                const response = await fetch("/friendships/" + id);
                const friendship = await response.json();
                setExisting(true);
                setAccepted(friendship.accepted);
                setIncoming(friendship.sender_id === id);
            } catch (error) {
                setError(error.message);
                setExisting(false);
                setAccepted(false);
            }
        })();
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
            fetch(`/friendships/${id}`, { method: "POST" }).then((response) => {
                if (response.status === 200) {
                    setExisting(true);
                    return;
                }
            });
            return;
        }
        if (incoming && !accepted) {
            fetch(`/api/friendships/${id}`, { method: "PUT" }).then(
                (response) => {
                    if (response.status === 200) {
                        setAccepted(true);
                        return;
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
                        setAccepted(false);
                        setIncoming(false);
                        return;
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
