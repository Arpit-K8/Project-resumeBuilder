import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    match: [NAME_REGEX, 'Name format is invalid']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 254,
    match: [EMAIL_REGEX, 'Email format is invalid']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128
  }
}, { timestamps: true });

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;