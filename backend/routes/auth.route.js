import express from "express"
import { zodValidation } from "../middlewares/zodValidation.js"
import { signInSchema, signupSchema } from "../utils/zodSchema/auth.schema.js"
import { handleSignIn, handleSignOut, handleSignup, handleUpdateAccessToken } from "../controllers/auth.controller.js"
const router=express.Router()
//signup
router.post("/signup",zodValidation(signupSchema),handleSignup)
//signin
router.post("/signin",zodValidation(signInSchema),handleSignIn)
//signout
router.post("/signout",handleSignOut)

//update accessToken
router.get("/update-access-token",handleUpdateAccessToken)



export default router 