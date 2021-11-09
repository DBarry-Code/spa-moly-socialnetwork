import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getRecentUsers, searchUsers } from "../api";
import ProfilePicture from "./profilePicture";
const DEFAULT_AVATAR = "/default-profile-pic.png";

export default function FindPeople() {
    const [recentUsers, setRecentUsers] = useState([]);
    const [searchResult, setSearchResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const users = await getRecentUsers();
            setRecentUsers(users);
            setLoading(true);
        })();
    }, []);

    async function onSubmit(event) {
        event.preventDefault();
        const results = await searchUsers(event.target.q.value);
        setSearchResults(results);
    }

    return (
        <>
            <section className="container d-flex justify-content-center align-items-center">
                <div className="card-recent shadow-lg mt-5">
                    <div className="upper-recent text-white bg-dark">
                        <div>
                            <h5 className="p-2">
                                {!isLoading
                                    ? "Recent Users Loding..."
                                    : "Recent Users"}
                            </h5>
                        </div>
                    </div>

                    <div className="profile-recent d-flex justify-content-evenly">
                        {recentUsers.map(
                            ({ id, first_name, last_name, avatar_url }) => (
                                <li
                                    className="d-flex flex-column align-items-center"
                                    key={id}
                                >
                                    <ProfilePicture
                                        onClick={() =>
                                            history.push(`user/${id}`)
                                        }
                                        first_name={first_name}
                                        last_name={last_name}
                                        avatar_url={
                                            avatar_url || DEFAULT_AVATAR
                                        }
                                    />
                                    <div>
                                        {first_name} {last_name}
                                    </div>
                                </li>
                            )
                        )}
                    </div>
                </div>
            </section>
            <section className="container d-flex justify-content-center align-items-center">
                <div className="card-search shadow-lg mt-5">
                    <div className="upper-recent text-white bg-dark">
                        <div>
                            <h5 className="p-2">Find new Users</h5>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} autoComplete="off">
                        <div className="form-floating mt-2">
                            <input
                                type="text"
                                name="q"
                                minLength={3}
                                className="form-control"
                                placeholder="Find user..."
                            />
                            <label htmlFor="q">Find user...</label>
                            <button
                                className="w-100 btn btn-l btn-primary mt-1"
                                type="submit"
                            >
                                Find User
                            </button>
                        </div>
                    </form>
                    {searchResult.length ? (
                        <div className="profile-recent d-flex flex-wrap justify-content-evenly">
                            {searchResult.map(
                                ({ id, first_name, last_name, avatar_url }) => (
                                    <div
                                        className="d-flex flex-column align-items-center"
                                        key={id}
                                    >
                                        <ProfilePicture
                                            onClick={() =>
                                                history.push(`user/${id}`)
                                            }
                                            first_name={first_name}
                                            last_name={last_name}
                                            avatar_url={
                                                avatar_url
                                                    ? avatar_url
                                                    : DEFAULT_AVATAR
                                            }
                                        />
                                        <div>
                                            {first_name} {last_name}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="text-center mt-2">NO USER FOUND</p>
                    )}
                </div>
            </section>
        </>
    );
}
