import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    prompt: {
        type: {
            text: {
                type: String,
                required: true
            },
            image: {
                type: String
            }
        },
        required: true
    },
    openAIResponse: {
        type: {
            text: {
                type: String
            },
            image: {
                type: String
            }
        },
        required: true
    },
    model: {
        type: String,
        default: "gpt-4"
    },
}, {
    timestamps: true
})

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    chats: [messageSchema]
}, {
    timestamps: true
})

const Chat = new mongoose.model('Chat', chatSchema)

export default Chat