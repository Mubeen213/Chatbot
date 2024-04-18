import express from "express";
import {getOauthAppDetails, handleGoogleCallbackAndExchangeCodes, setUpAccount} from "../controller/AuthController.js";
import {authenticateUser} from "../middlewares/AuthenticateUser.js";


const router = express.Router()

router.route('/oauthAppDetails')
    .get(getOauthAppDetails)

router.route('/oauth/callback')
    .get(handleGoogleCallbackAndExchangeCodes)
router.route('/setup')
    .post(authenticateUser, setUpAccount)

export default router