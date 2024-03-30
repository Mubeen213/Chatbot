import mongoose from "mongoose";


const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'blocked']
    }
}, {
    timestamps: true
})

const Organization = mongoose.model('Organization', organizationSchema)

export default Organization