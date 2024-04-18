import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {createTokenUser, setAuthCookiesToResponse} from "../utils/TokenUtils.js";
import axios from "axios";
import * as querystring from "querystring";
import {BadRequest} from "../errors/BadRequest.js";
import Organization from "../models/Organization.js";
import {hashString} from "../utils/PasswordUtils.js";


export const getOauthAppDetails = async (req, res) => {
    res.status(StatusCodes.OK)
        .json({
            OauthAppDetails: {
                GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
                REDIRECT_URL: process.env.REDIRECT_URL,
                AUTHORIZATION_URL: process.env.AUTHORIZATION_URL,
                SCOPE: process.env.SCOPE
            }
        });
}

export const handleGoogleCallbackAndExchangeCodes = async (req, res) => {
    const {code} = req.query
    const requestBody = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CILENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: 'authorization_code'
    }

    const tokenResponse = await axios.post(process.env.TOKEN_URL,
        querystring.stringify(requestBody), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    const accessToken = tokenResponse.data.access_token;

    // Use the access token to fetch user information
    const userInfoUrl = 'https://openidconnect.googleapis.com/v1/userinfo';
    const userInfoResponse = await axios.get(userInfoUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const userData = userInfoResponse.data;
    const {name, email} = userData
    let user;
    const existingUser = await User.findOne({email: email})
    if (!existingUser) {
        user = await User.create({
            name,
            email
        })
    } else {
        user = existingUser;
    }
    const tokenUser = createTokenUser(user)
    setAuthCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK)
        .json({
            'user': user
        })
}

export const setUpAccount = async (req, res) => {

    const {orgName, openAIOrganizationKey, openAIAPIKey} = req.body;
    const user = await User.findOne({email: req.user.email})
    if (!user) {
        throw new BadRequest(`User with email ${req.user.email} does not exist`)
    }

    if (user.organization) {
        throw new BadRequest(`Accounts already exists. Please login to your organization`)
    }
    const hashedOrganizationKey = await hashString(openAIOrganizationKey)
    const hashedAPIKey = await hashString(openAIAPIKey)
    const org = await Organization.create({
        name: orgName,
        openAIOrganizationKey: hashedOrganizationKey,
        openAIAPIKey: hashedAPIKey
    })

    user.organization = org;
    user.role = 'admin';
    user.save();

    return res.status(StatusCodes.CREATED)
        .json({
            msg: 'Setup successful'
        })
}

export const logout = async (req, res) => {

    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })

    res.status(StatusCodes.OK)
        .json({
            msg: 'User logged out'
        })
}