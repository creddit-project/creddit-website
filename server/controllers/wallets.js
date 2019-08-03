const { body, validationResult } = require('express-validator/check');
const Wallet = require('../models/wallet');
const User = require('../models/user');
const RPC = require('monero-nodejs');
const config = require('../config');

exports.generateAddress = () => {
  return new Promise(callback => {
    const client = new RPC(config.coin.host, config.coin.port);

    client.integratedAddress().then((data) => {
      client._body('add_address_book', { address: data.integrated_address });

      const integratedAddress = data.integratedAddress ? data.integratedAddress : '0x';
      const paymentId = data.payment_id ? data.payment_id : 'PlaceholderAddress';

      callback(integratedAddress + '' + paymentId);
    });
  });
};

exports.getBalance = async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  let wallet = await Wallet.find({ owner: user.id });

  const address = await this.generateAddress();
  const owner = user.id;
  const balance = 0;

  if (!wallet || wallet.length === 0)
    wallet = await Wallet.create({
      owner,
      address,
      balance
    });

  res.json(wallet);
};
