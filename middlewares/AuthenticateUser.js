import {Unauthenticated} from "../errors/Unauthenticated.js";
import {isTokenValid} from "../utils/TokenUtils.js";
import {Unauthorized} from "../errors/Unauthorized.js";


export const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new Unauthenticated('Invalid token')
    }
    try {
        const {name, email, userId, role} = isTokenValid({token: token})
        req.user = {name, email, userId, role}
        next()
    } catch (error) {
        throw new Unauthenticated('Invalid authentication' + error)
    }
}

export const authorizePermissions = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Unauthorized('Unauthorized to access this route')
        }
        next()
    }
}