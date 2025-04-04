const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require('jsonwebtoken');

passport.use(
    new GoogleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECREAT,
        callbackURL:"/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done)=>{
        const user ={
            googleId:profile.id,
            name:profile.displayName,
            email:profile.emails[0].value,
            picture:profile.photos[0].value,
            accessToken
        };

        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn:"3h"});
        return done(null, {user, token})
    }
)
);

// passport.serializeUser((user, done)=>{
//     done(null, user);
// });

// passport.deserializeUser((user, done)=>{
//     done(null, user);
// })

module.exports = passport