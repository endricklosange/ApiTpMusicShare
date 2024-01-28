module.exports = (server) => {
    const musicController = require("../controllers/musicController");

    server.route("/posts/:post_id/comments")
        .get(musicController.listAllMusics)
        .post(musicController.createAMusic);
}