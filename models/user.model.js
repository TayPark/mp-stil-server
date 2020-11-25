import mongoose from 'mongoose';
const ObjectId = mongoose.ObjectId;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: { unique: true, dropDups: true } },
  password: { type: String, required: true },
});

/**
 * Create user
 * @param {String} email
 * @param {String} password
 */
userSchema.statics.create = function (email, password) {
  return new this({ email, password }).save();
};

export default mongoose.model('user', userSchema);
