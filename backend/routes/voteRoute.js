module.exports = (server) => {
    const voteController = require("../controllers/voteController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/vote/:session_id")
        .post(jwtMiddleware.verifyToken, voteController.voteForMusicInSession);

    server.route("/get-vote-results/:session_id")
        .get(jwtMiddleware.verifyToken, voteController.getVoteResultsForSession);
};
