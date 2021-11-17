import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import ProfilePicture from "./profilePicture";

let socket;

const chat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const inputRef = useRef(null);
    const lastMessageRef = useRef(null);

    function formatTime(time) {
        const date = new Date(time);
        return `${date.toLocaleTimeString()}`;
    }

    useEffect(() => {
        if (!socket) {
            socket = io.connect();
        }

        setImmediate(() => inputRef.current.focus());

        return () => {
            socket.disconnect();
            socket = null;
        };
    }, []);

    useEffect(() => {
        socket.on("recentMessages", (data) => {
            setMessages(data);
        });
        setLoading(true);

        socket.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        });
        if (!lastMessageRef.current) {
            return;
        }
        lastMessageRef.current.scrollIntoView();
    }, [messages]);

    const onSubmit = (event) => {
        event.preventDefault();
        const text = event.target.text.value;
        socket.emit("message", text);
        event.target.text.value = "";
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
                            (
                                {
                                    id,
                                    sender_id,
                                    first_name,
                                    last_name,
                                    avatar_url,
                                    created_at,
                                    text,
                                },
                                index
                            ) => (
                                <li
                                    className="d-flex align-items-center justify-content-between"
                                    key={id}
                                    ref={
                                        messages.length - 1 === index
                                            ? lastMessageRef
                                            : null
                                    }
                                >
                                    <div>
                                        <ProfilePicture
                                            onClick={() =>
                                                history.push(
                                                    `user/${sender_id}`
                                                )
                                            }
                                            first_name={first_name}
                                            last_name={last_name}
                                            avatar_url={avatar_url}
                                        />
                                        <p className="text-center">
                                            {first_name}
                                        </p>
                                    </div>
                                    <div>
                                        <strong>{text}</strong>
                                    </div>
                                    <div>
                                        <strong>
                                            {formatTime(created_at)}
                                        </strong>
                                    </div>
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
                        placeholder="Message"
                        aria-label="Message"
                        ref={inputRef}
                        required
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
