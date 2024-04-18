import mongoose from "mongoose";


const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please give a name for your organization']
    },
    openAIAPIKey: {
        type: String,
        required: [true, 'Please provide the OpenAI API Key'],
        select: false
    },
    openAIOrganizationKey: {
        type: String,
        required: [true, 'Please provide the OpenAI Organization Key'],
        select: false
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'blocked'],
        default: 'active'
    }
}, {
    timestamps: true
})

const Organization = mongoose.model('Organization', organizationSchema)

export default Organization