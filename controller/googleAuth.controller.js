const express = require('express')
const passport = require('passport')
require('../middleware/passport.config');
const googleController = express();

googleController.use(passport.initialize());

googleController.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

googleController.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        res.json({ token: req.user.token, user: req.user.user });
    }
);

module.exports = googleController;