const Vote = require('../models/voteModels');
const Music = require('../models/musicModel');

exports.voteForMusicInSession = async (req, res) => {
    try {
        const { user_id, music_id, rating } = req.body;

        // Vérifier si l'utilisateur a déjà voté pour cette musique dans la session
        const existingVote = await Vote.findOne({ user_id, music_id });

        if (existingVote) {
            res.status(400).json({ message: "L'utilisateur a déjà voté pour cette musique dans la session." });
            return;
        }

        // Vérifier si la musique existe dans la session
        const musicInSession = await Music.findOne({ _id: music_id, session_id: req.body.session_id });
        if (!musicInSession) {
            console.log(musicInSession);
            res.status(404).json({ message: "La musique n'existe pas dans la session spécifiée." });
            return;
        }

        const newVote = new Vote({
            user_id,
            music_id,
            rating
        });

        await newVote.save();

        res.status(201).json({ message: "Vote enregistré avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.getVoteResultsForSession = async (req, res) => {
    try {
        const session_id = req.body.session_id;

        // Récupérer tous les votes pour la session spécifiée
        const votes = await Vote.find({ music_id: { $in: await Music.find({ session_id }) } });

        // Calculer les résultats de vote (par exemple, la moyenne des votes)
        // Vous pouvez ajuster cette logique en fonction de vos besoins.

        let totalRating = 0;
        let totalVotes = 0;

        votes.forEach(vote => {
            totalRating += vote.rating;
            totalVotes++;
        });
        console.log(votes);
        const averageRating = totalVotes > 0 ? totalRating / totalVotes : 0;

        res.status(200).json({ session_id, totalVotes, averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};
