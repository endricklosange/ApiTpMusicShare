const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with the hashed password
        let newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        // Save the user to the database
        let user = await newUser.save();
        res.status(201).json({ message: `Utilisateur créé: ${user.email}` });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Requête invalide" });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(500).json({ message: "Utilisateur non trouvé" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const userData = {
                id: user._id,
                email: user.email,
                role: "admin"
            };
            const token = await jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "10h" });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Une erreur s'est produite lors du traitement" });
    }
};
