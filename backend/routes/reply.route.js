import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { zodValidation } from "../middlewares/zodValidation.js"
import { createReplySchema } from "../utils/zodSchema/reply.schema.js"
import { handleCreateReply, handleGetReply } from "../controllers/reply.controller.js"
const router=express.Router()

//create reply
router.post("/:commentId/reply",verifyJWT,zodValidation(createReplySchema),handleCreateReply)

//get reply
router.get("/:commentId/reply",handleGetReply)


export default router