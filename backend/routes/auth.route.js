import express from "express"
import { HandleSignInWithGoogle, handleSignIn, handleSignOut, handleSignup, handleUpdateAccessToken, handleUserInfo } from "../controllers/auth.controller.js"
import passport from "../middlewares/passport.js"
import { zodValidation } from "../middlewares/zodValidation.js"
import { signInSchema, signupSchema } from "../utils/zodSchema/auth.schema.js"






const router=express.Router()
//signup
router.post("/signup",zodValidation(signupSchema),handleSignup)
//signin
router.post("/signin",zodValidation(signInSchema),handleSignIn)



//signout
router.post("/signout",handleSignOut)

//update accessToken
router.get("/update-access-token",handleUpdateAccessToken)

//user info
router.get("/user-info",handleUserInfo)

//signin with google
router.get("/signin/google",passport.authenticate("google"))
router.get('/google/callback', 
  passport.authenticate('google',{session:false,  failureRedirect: `${process.env.FRONTEND_URL}/auth/signup`}),HandleSignInWithGoogle);



export default router 