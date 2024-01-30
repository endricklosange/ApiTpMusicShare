const VotingSession = require('../models/sessionModel');

exports.listAllVotingSessions = async (req, res) => {
    try {
        const votingSessions = await VotingSession.find({});
        res.status(200);
        res.json(votingSessions);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};

exports.createAVotingSession = async (req, res) => {
    try {
        const newVotingSession = new VotingSession(req.body);
        const votingSession = await newVotingSession.save();

        res.status(201).json(votingSession);
    } catch (error) {
        res.status(401).json({ message: "Requête invalide." });
    }
};

exports.getAVotingSession = async (req, res) => {
    try {
        const votingSession = await VotingSession.findById(req.params.id_voting_session);
        res.status(200);
        res.json(votingSession);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};

exports.updateAVotingSession = async (req, res) => {
    try {
        const votingSession = await VotingSession.findByIdAndUpdate(req.params.id_voting_session, req.body, { new: true });
        res.status(200);
        res.json(votingSession);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};

exports.deleteAVotingSession = async (req, res) => {
    try {
        await VotingSession.findByIdAndDelete(req.params.id_voting_session);
        res.status(200);
        res.json({ message: "Session de vote supprimée" });

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};
