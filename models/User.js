import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const User = mongoose.model('user', userSchema);

export default User;