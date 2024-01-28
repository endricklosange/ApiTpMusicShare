const Music = require('../models/musicModel');

exports.createAMusic = (req, res) => {

    Session.findById(req.params.session_id, (error, session) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Requête invalide." });
        } else {
            let newMusic = new Music({ ...req.body, session_id: req.params.session_id });

            newMusic.save((error, music) => {
                if (error) {
                    res.status(401);
                    console.log(error);
                    res.json({ message: "Requête invalide." });
                } else {
                    res.status(201);
                    res.json(music);
                }
            });
        }

    });
    
};

exports.listAllMusics = (req, res) => {
    // Remplacez 'session_id' par le nom de votre champ d'identifiant de session
    Music.find({ session_id: req.params.session_id }, (error, musics) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        } else {
            res.status(200);
            res.json(musics);
        }
    });
};

