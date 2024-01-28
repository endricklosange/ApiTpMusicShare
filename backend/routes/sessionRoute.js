module.exports = (server) => {
    const sessionController = require("../controllers/sessionController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/session")
        .get(sessionController.listAllVotingSessions)
        .post(jwtMiddleware.verifyToken, sessionController.createAVotingSession);

    server.route("/session/:session_id")
        .all(jwtMiddleware.verifyToken)
        .get(sessionController.getAVotingSession)
        .put(sessionController.updateAVotingSession)
        .delete(sessionController.deleteAVotingSession);
};
