module.exports = (server) => {
    const musicController = require("../controllers/musicController");

    server.route("/music")
        .get(musicController.findAll)
        .post(musicController.createAMusic);

    server.route("/music/:id_voting_session")
        .get(musicController.listAllMusics)
    
}