import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import User from "../modules/users/model";
const keys = require("../config/db");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JWT_SECRET;

module.exports = passport => {
  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          // If user is found
          if (user) {
            return done(null, user);
          }
          // If user is not found
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
