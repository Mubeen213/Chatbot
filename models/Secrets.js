import mongoose from "mongoose";

const secretsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization',
    },
    openAIKey: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Secrets = new mongoose.model('Secrets', secretsSchema);

export default Secrets