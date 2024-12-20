const passport = require('passport');
const {ExtractJwt, Strategy: JWTStrategy }= require('passport-jwt'); 
const User = require('../models/users');
require("dotenv").config();

const setJWTStrategy = () => {
    const {SECRET} = process.env

    const params = {
        secretOrKey: SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(
        new JWTStrategy(
            params,
            async function (payload, done) {
                try {
                    const user = await User.findOne({ _id: payload.id }).lean()
                    
                    if (!user) {
                        return done(new Error("User not found"))
                    }

                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


}

module.exports = setJWTStrategy