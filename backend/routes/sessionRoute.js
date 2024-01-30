module.exports = (server) => {
    const sessionController = require("../controllers/sessionController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/session")
        .post(jwtMiddleware.verifyToken, sessionController.createAVotingSession);

    server.route("/session/:session_id")
        .get(sessionController.getAVotingSession)
};
