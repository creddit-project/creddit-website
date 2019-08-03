const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const walletSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String },
  balance: { type: Number }
});

walletSchema.set('toJSON', { getters: true });
walletSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  return obj;
};

walletSchema.methods.addFunds = (amount) => {
  this.balance += amount;

  return this.save();
};

walletSchema.methods.triggerSave = () => {
  console.log('FAGGOT');

  return this.save();
};

walletSchema.pre('save', (next) => {
  console.log('pre-save');
  next();
});

walletSchema.post('save', async (next) => {
  const user = await User.find({ _id: this.owner });

  console.log('Saving...');

  next();
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
