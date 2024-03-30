import OpenAI from "openai";
import {StatusCodes} from "http-status-codes";
import Chat from "../models/Chat.js";

export const getOpenAIResponse = async (req, res) => {

    const {model, text, chatID} = req.body;

    const openai = new OpenAI({
        apiKey: process.env.OPENAIKEY
    });
    let chat;
    if (chatID) {
         chat = await Chat.findOne({_id: chatID})
    } else {
        chat = new Chat({ name: "New Chat", model: model || "gpt-4" });
        await chat.save();
    }
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: text
            }
        ],
        model: model || "gpt-4",
    });

    const message = {
        prompt: {
            text: text
        },
        openAIResponse: {
            text: completion.choices[0].message.content
        },
        model: model
    };
    chat.chats.push(message);
    await chat.save();

    res.status(StatusCodes.OK)
        .json({
            data: completion.choices[0].message.content
        })
}