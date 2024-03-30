import {CustomAPI} from "./CustomAPI.js";
import {StatusCodes} from "http-status-codes";

export class Unauthenticated extends CustomAPI {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}