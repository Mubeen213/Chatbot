import express from "express";
import {getOpenAIResponse} from "../controller/OpenAiController.js";
const router = express.Router()

router.route('/getGpt4')
    .post(getOpenAIResponse)

export default router