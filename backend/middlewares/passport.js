// import dotenv from "dotenv";
// import passport from "passport";
// import { Strategy } from "passport-google-oauth20";
// import User from "../models/user.model.js";
// import logger from "../utils/logger.js";
// import jwt from "jsonwebtoken";
// dotenv.config();

// export default passport.use(
//   new Strategy(
//     {
//       clientID: `${process.env.GOOGLE_CLIENT_ID}`,
//       clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
//       callbackURL: "http://localhost:3000/api/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const email = profile.emails[0].value;
//       const findUser = await User.findOne({ email: email });
      
//       // try {
//       //   const email = profile.emails[0].value;
//       //   const findUser = await User.findOne({ email: email });
//       //   if (!findUser) {
//       //     return done(null,false)
//       //   }
//       //   const accessToken = jwt.sign(
//       //     {
//       //       id: findUser.id,
//       //       email: findUser.email,
//       //     },
//       //     process.env.ACCESS_TOKEN_SECRET,
//       //     { expiresIn: "300s" } //5min
//       //   );
//       //   const refreshToken = jwt.sign(
//       //     {
//       //       id: findUser.id,
//       //       email: findUser.email,
//       //     },
//       //     process.env.REFRESH_TOKEN_SECRET,
//       //     { expiresIn: "18000s" } //50min
//       //   );
//       //   await User.findOneAndUpdate({ email: email }, {
//       //     refreshToken: refreshToken,
//       //   });

//       //   return done(null, { accessToken, refreshToken });
//       // } catch (error) {
//       //   logger.error(error);
//       //   done(error, false, { message: "Something went wrong" });
//       // }
//     }
//   )
// );
