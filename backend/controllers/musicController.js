const Music = require('../models/musicModel');
const Session = require('../models/sessionModel');

exports.createAMusic = async (req, res) => {
    try {
        const session = await Session.findById(req.body.id_voting_session);

        if (!session) {
            return res.status(401).json({ message: "Session invalide." });
        }

        const newMusic = new Music({ ...req.body, id_voting_session: req.body.id_voting_session });
        const music = await newMusic.save();

        res.status(201).json({ message: "Musique créée avec succès.", music });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.listAllMusics = async (req, res) => {
    try {
        const musics = await Music.find({ id_voting_session: req.params.id_voting_session });

        res.status(200).json({ musics });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.findAll = async (req, res) => {
    try {
        const musics = await Music.find();

        res.status(200).json({ message: "Toutes les musiques récupérées avec succès.", musics });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

