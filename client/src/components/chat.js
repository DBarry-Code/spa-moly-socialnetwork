import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import io from "socket.io-client";
import ProfilePicture from "./profilePicture";

let socket;

const chat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!socket) {
            socket = io.connect();
        }
        socket.on("recentMessages", (data) => {
            setMessages(data);
        });
        return () => {
            socket.disconnect();
            socket = null;
        };
    }, []);

    console.log(messages);

    // useEffect(() => {
    //     socket.on("recentMessages", (data) => {
    //         setMessages(data);
    //     });
    // }, [messages]);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.text.value);
    };

    return (
        <section className="container d-flex justify-content-center align-items-center">
            <div className="card-chat shadow-lg mt-5">
                <div className="upper-recent text-white bg-dark">
                    <h5 className="p-2">
                        {!isLoading ? "Global Chat Loding..." : "Global Chat"}
                    </h5>
                </div>

                <div className="chat-text d-flex flex-column justify-content-evenly">
                    <ul className="list-inline">
                        {messages.map(
                            ({
                                id,
                                first_name,
                                last_name,
                                avatar_url,
                                created_at,
                                text,
                            }) => (
                                <li className="d-flex flex-row" key={id}>
                                    <ProfilePicture
                                        onClick={() =>
                                            history.push(`user/${id}`)
                                        }
                                        first_name={first_name}
                                        last_name={last_name}
                                        avatar_url={avatar_url}
                                    />

                                    <p>{text} </p>
                                    <time>{created_at} </time>
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <form
                    onSubmit={onSubmit}
                    autoComplete="off"
                    className="input-group mb-3"
                >
                    <input
                        type="text"
                        name="text"
                        className="form-control"
                        placeholder="Massage"
                        aria-label="Message"
                        aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="sumit"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default chat;
