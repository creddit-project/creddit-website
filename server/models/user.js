const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  depositAddress: String,
  balance: Number,
  admin: Boolean
}, { collation: { locale: 'en', strength: 1 } });

userSchema.set('toJSON', { getters: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };

  delete obj._id;
  delete obj.__v;
  delete obj.password;

  return obj;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  this.balance = this.balance ? parseFloat(this.balance) : parseFloat('0.00');
  this.depositAddress = this.depositAddress ? this.depositAddress : '0xPlaceHolderAddress';

  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
