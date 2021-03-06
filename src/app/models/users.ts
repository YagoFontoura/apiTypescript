

import mongoose from '../../database';
const bcrypt = require('bcryptjs');

export interface IUser extends mongoose.Document {
    username: string,
    password: string
  }


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    adminUser: {
        type: Boolean,
        default: true,
        select: false,
    },
    keyAcess: {
        type: String,
        required: true,
    },
    passwordResetToken: {
        type: String,
        select:false,
    },
    passwordResetExpires:{
        type: Date,
        select:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

UserSchema.pre<IUser>("save", async function(next) {
    
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();

});

export const User = mongoose.model('User', UserSchema);

