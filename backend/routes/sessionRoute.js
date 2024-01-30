module.exports = (server) => {
    const sessionController = require("../controllers/sessionController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/session")
        .post(sessionController.createAVotingSession)
        .get(sessionController.listAllVotingSessions)

    server.route("/session/:id_voting_session")
        .get(sessionController.getAVotingSession)
};
