import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    required: true,
      default: '',
    unique: true,
    lowercase:true  },
  password: String,
  phone: String,
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  profilePicture: String,
  course: String
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
