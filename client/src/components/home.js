const home = ({ first_name, last_name }) => {
    return (
        <>
            <section className="container d-flex justify-content-center align-items-center">
                <div className="card-recent shadow-lg mt-5">
                    <div className="upper-recent text-white bg-dark">
                        <div>
                            <h3 className="p-2">Welcome</h3>
                        </div>
                    </div>

                    <div className="profile-recent d-flex justify-content-evenly">
                        <div>
                            <p className="text-center mt-3">
                                Hi {first_name} {last_name} and welcome to the
                                Socical Network an have fun to finde new people,
                                make common friends and chat with them!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default home;
