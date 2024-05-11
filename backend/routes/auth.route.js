import express from "express"
import { zodValidation } from "../middlewares/zodValidation.js"
import { signInSchema, signupSchema } from "../utils/zodSchema/auth.schema.js"
import { handleSignIn, handleSignOut, handleSignup, handleUpdateAccessToken } from "../controllers/auth.controller.js"
// import passport from "../middlewares/passport.js"
import logger from "../utils/logger.js"






const router=express.Router()
//signup
router.post("/signup",zodValidation(signupSchema),handleSignup)
//signin
router.post("/signin",zodValidation(signInSchema),handleSignIn)



//signout
router.post("/signout",handleSignOut)

//update accessToken
router.get("/update-access-token",handleUpdateAccessToken)

//signin with google
// router.get("/signin/google",passport.authenticate("google"))
// router.get('/google/callback', 
//   passport.authenticate('google',{failureRedirect:`${process.env.FRONTEND_URL}/profile`}),async(req,res)=>{
//     if (!req.user) {
//       return res.status(401).json({
//         message: "Email doesn't match with any account",
//       });} 
//     logger.info(req.user)
      
     

    
//   }
  
//    );



export default router 