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
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    profileUrl: {
        type: String,
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization',
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'blocked']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
})

userSchema.index({email: 1})
userSchema.index({email: 1, organization: 1}, {unique: true});

const User = mongoose.model('User', userSchema);

export default User