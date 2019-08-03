const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  if (!this.balance) this.balance = amount;
  else this.balance += amount;

  return this.save();
};

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
