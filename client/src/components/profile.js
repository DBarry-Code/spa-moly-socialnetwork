import ProfilePicture from "./profilePicture";
import BioEdit from "./bioEdit";

export default function Profile({
    first_name,
    last_name,
    avatar_url,
    email,
    bio,
    onBioUpdate,
    onClick,
}) {
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow-lg mt-5">
                <div className="upper bg-dark"></div>
                <div className="user text-center">
                    <div className="profile">
                        {" "}
                        <ProfilePicture
                            onClick={onClick}
                            first_name={first_name}
                            last_name={last_name}
                            avatar_url={avatar_url}
                        />{" "}
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <h4 className="mb-0">
                        {first_name} {last_name}
                    </h4>{" "}
                    <span className="text-muted d-block mb-2">{email} </span>{" "}
                    <BioEdit bio={bio} onBioUpdate={onBioUpdate} />
                </div>
            </div>
        </div>
    );
}
