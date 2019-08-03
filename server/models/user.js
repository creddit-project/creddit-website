const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Wallet = require('./wallet');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  admin: Boolean
}, { collation: { locale: 'en', strength: 1 } });

userSchema.set('toJSON', { getters: true });
userSchema.options.toJSON.transform = async (doc, ret) => {
  const obj = { ...ret };

  delete obj._id;
  delete obj.__v;
  delete obj.password;

  return obj;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.assignWallet = function(id) {
  this.wallet = id;

  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
