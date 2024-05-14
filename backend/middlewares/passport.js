import dotenv from "dotenv";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
dotenv.config();

export default passport.use(
  new Strategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
      scope: ["profile", "email"],
       
    },
     async(accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user= await User.findOne({ email: email })
            if(!user){
                return done(null, false, { message: "User not found. Please sign up." });
            }
            return done(null,user);
        } catch (error) {
           logger.error(error)
           return done(err);
        }
      
      ;
      
      
    }
  )
);
