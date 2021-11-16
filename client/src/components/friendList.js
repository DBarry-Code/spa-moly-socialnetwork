import { useState, useEffect } from "react";
import ProfilePicture from "./profilePicture";
import { useHistory } from "react-router-dom";

const DEFAULT_AVATAR = "/default-profile-pic.png";

function friendList() {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({});
    const [isFriend, setFriend] = useState([]);
    const [isRequest, setRequest] = useState([]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("/api/friendships");
                const users = await response.json();
                setFriend(users.filter((x) => x.accepted));
                setRequest(users.filter((x) => !x.accepted));
                setLoading(true);
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        })();
    }, []);

    async function acceptFriendship(user) {
        await fetch(`/api/friendships/${user.user_id}`, { method: "PUT" });
        setRequest(isRequest.filter((x) => x.user_id !== user.user_id));
        setFriend([...isFriend, user]);
    }

    async function deleteFriendship(user) {
        await fetch(`/api/friendships/${user.user_id}`, { method: "DELETE" });
        setFriend(isFriend.filter((x) => x.user_id !== user.user_id));
    }

    return (
        <>
            <section className="container d-flex justify-content-center align-items-center">
                <div className="card-my-friends shadow-lg mt-5">
                    <div className="upper-recent text-white bg-dark">
                        <div>
                            <h5 className="p-2">
                                {!isLoading
                                    ? "Frendship request Loding..."
                                    : "Frendship request"}
                            </h5>
                        </div>
                    </div>

                    <div className="profile-recent d-flex flex-column">
                        {isError && <p>{isError.message}</p>}

                        {isRequest.length ? (
                            isRequest.map((user) => (
                                <li
                                    className="d-flex flex-row align-items-center justify-content-between"
                                    key={user.user_id}
                                >
                                    <ProfilePicture
                                        onClick={() =>
                                            history.push(`user/${user.user_id}`)
                                        }
                                        first_name={user.first_name}
                                        last_name={user.last_name}
                                        avatar_url={
                                            user.avatar_url || DEFAULT_AVATAR
                                        }
                                    />
                                    <div>
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <button
                                        onClick={() => acceptFriendship(user)}
                                        className="btn btn-primary"
                                    >
                                        Accept
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-center">No friends request</p>
                        )}
                    </div>
                </div>
            </section>
            <section className="container d-flex justify-content-center align-items-center">
                <div className="card-my-friends shadow-lg mt-5">
                    <div className="upper-recent text-white bg-dark">
                        <div>
                            <h5 className="p-2">
                                {!isLoading
                                    ? "My Friends Loding..."
                                    : "My Friends "}
                            </h5>
                        </div>
                    </div>

                    <div className="profile-recent d-flex flex-column justify-content-evenly">
                        {isError && <p>{isError.message}</p>}
                        {isFriend.length ? (
                            isFriend.map((user) => (
                                <li
                                    className="d-flex flex-row align-items-center justify-content-between"
                                    key={user.user_id}
                                >
                                    <ProfilePicture
                                        onClick={() =>
                                            history.push(`user/${user.user_id}`)
                                        }
                                        first_name={user.first_name}
                                        last_name={user.last_name}
                                        avatar_url={
                                            user.avatar_url || DEFAULT_AVATAR
                                        }
                                    />
                                    <div className="ms-3 mt-2">
                                        {user.first_name} {user.last_name}
                                    </div>

                                    <button
                                        onClick={() => deleteFriendship(user)}
                                        className="btn btn-primary"
                                    >
                                        Unfriend
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-center">No Friends</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default friendList;
