const logout = () => {
    async function onClick(event) {
        event.preventDefault();
        const response = await fetch("/api/logout", { method: "POST" });
        response.json();
        window.location = "/login";
    }

    return (
        <>
            <li>
                <button className="btn nav-link" onClick={onClick}>
                    Logout
                </button>
            </li>
        </>
    );
};

export default logout;
