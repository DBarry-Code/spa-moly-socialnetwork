import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserbyId } from "../api";
import ProfilePicture from "./profilePicture";

export default function usersProfileModal() {
    const [userById, setUserById] = useState({});
    const [error, setError] = useState({});
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            try {
                const user = await getUserbyId(id);
                console.log(user);
                setUserById(user);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        })();
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow-lg mt-5">
                <div className="upper bg-dark">
                    <Link
                        to="/findpeople"
                        type="button"
                        className="btn-close btn-close-white float-end m-2"
                        aria-label="Close"
                    ></Link>
                </div>

                <div className="user text-center">
                    <div className="profile">
                        <ProfilePicture
                            first_name={userById.first_name}
                            last_name={userById.last_name}
                            avatar_url={userById.avatar_url}
                        />
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <h4 className="mb-0">
                        {userById.first_name} {userById.last_name}
                    </h4>
                    <span className="text-muted d-block mb-2">
                        {userById.email}
                    </span>
                    <p className="mt-4">{userById.bio}</p>
                    {error && <p className="mb-0">{error.message}</p>}
                </div>
            </div>
        </div>
    );
}
