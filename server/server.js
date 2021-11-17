const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const usersRouter = require("./routers/users");
const friendsRouter = require("./routers/friendships");
const { getChatMessages } = require("./db");

const PORT1 = 3001;
const { Server } = require("http");
const server = Server(app);
const io = require("socket.io")(server, {
    allowRequest: (request, callback) =>
        callback(
            null,
            request.headers.referer.startsWith(`http://localhost:3000`)
        ),
});

app.use(compression());
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use("/api", usersRouter, friendsRouter);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.on("connection", async (socket) => {
    console.log("[socialnetwork:socket] incoming socked connection", socket.id);
    const { user_id } = socket.request.session;
    if (!user_id) {
        return socket.disconnect(true);
    }

    // 1. send back the latest 10 msgs to every new connected user
    // with socket.emit:
    const messages = await getChatMessages({ limit: 10 });

    socket.emit("recentMessages", messages.reverse());
});

server.listen(process.env.PORT || PORT1, function () {
    console.log(`I'm listening on ${PORT1}`);
});
