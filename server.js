import express from 'express'
const app = express()
import  dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import {ErrorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware.js";

import openaiRoutes from './routes/OpenAIRequestRoutes.js'

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/api/v1/openai', openaiRoutes)

app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 2001
const start = async (req, res) => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to db")
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}...`)
    })
}

start()
