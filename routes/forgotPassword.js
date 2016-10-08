const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const crypto = require('crypto');

router.post('/forgot', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({ success: false, message: 'Email não cadastrado' });
    }
    crypto.randomBytes(20, (err, data) => {
      if (err) {
        return res.json({ success: false, message: 'Erro ao gerar o token' });
      }
      let token = data.toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;

      user.save((err) => {
        if (err) {
          res.json({ success: false, message: 'Erro ao atualizar o cliente' });
        }
        res.json({ success: true, token: token });
      });
    });
  })
});

router.get('/reset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      return res.json({ success: false, message: 'Token inválido' });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save((err) => {
      if (err) {
        return res.json({ success: false, message: 'Erro ao atualizar o cliente' });
      }
      res.json({ success: true });
    });
  });
});

module.exports = router;
