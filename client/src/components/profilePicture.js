const DEFAULT_AVATAR = "/default-profile-pic.png";

export default function ProfilePicture({
    first_name,
    last_name,
    avatar_url = DEFAULT_AVATAR,
    onClick,
}) {
    return (
        <div>
            <img
                className="avatar rounded-circle"
                width="50px"
                onClick={onClick}
                src={avatar_url || DEFAULT_AVATAR}
                alt={`${first_name} ${last_name}`}
            />
        </div>
    );
}
