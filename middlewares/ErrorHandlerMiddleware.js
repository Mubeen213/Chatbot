import {StatusCodes} from "http-status-codes";

export const ErrorHandlerMiddleware = (err, req, res, next) => {

    console.log(err)

    let customError = {
        msg: err.message || 'Something went wrong',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if (err.name === 'ValidationError') {
        console.log(err.errors)
        customError.msg =
            Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({
        msg: customError.msg
    })
}

