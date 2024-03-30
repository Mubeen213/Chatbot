import {CustomAPI} from "./CustomAPI.js";
import {StatusCodes} from "http-status-codes";

export class BadRequest extends CustomAPI {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}