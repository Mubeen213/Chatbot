import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    profileUrl: {
        type: String,
    },
    accountType: {
        type: String,
        enum: [null, 'user', 'organization']
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization',
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'blocked']
    }
}, {
    timestamps: true
})

userSchema.index({email: 1})

const User = mongoose.model('User', userSchema);

export default User