import {CustomAPI} from "./CustomAPI.js";
import {StatusCodes} from "http-status-codes";

export class Unauthorized extends CustomAPI {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN
    }
}