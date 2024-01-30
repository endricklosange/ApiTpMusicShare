module.exports = (server) => {
    const voteController = require("../controllers/voteController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    server.route("/vote/:session_id")
        .post(voteController.voteForMusicInSession);

    server.route("/vote/:session_id")
        .get(voteController.getVoteResultsForSession);
};
