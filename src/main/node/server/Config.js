var Config = {
    SERVER_WEB_PORT: 8080,
    SERVER_WEB_PATH: __dirname + "/../../../../public",
    SERVER_VIEW_PATH: __dirname + "/../../../../private/views",
    SERVER_SESSIONS_PATH: __dirname + "/../../../../private/sessions",
    SERVER_USERS_PATH: __dirname + "/../../../../private/users",
    SERVER_SESSION_SECRET: "keyboard cat",
    SERVER_SESSION_ID: "SESSION_ID",
    SERVER_SOCKET_PORT: 8081,
    SERVER_SOCKET_PATH: "big-canvas"
};

module.exports = Config;