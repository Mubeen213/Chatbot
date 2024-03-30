import {CustomAPI} from "./CustomAPI.js";
import {StatusCodes} from "http-status-codes";

export class NotFound extends CustomAPI {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND
    }
}