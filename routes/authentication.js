const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const config = require('../configs/config.js');
const bcrypt = require('bcrypt');
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


router.post('/login', (req, res) => {
      User.findOne({ email: req.body.username },
      { _id: 1, email: 1, name: 1, role: 1, password: 1, passfirebird: 0 }, 
    (err, user) => {
      if (err) {
        res.json({ success: false, message: 'Email ou Senha inválidos' });
      }
      if (!user) {
        res.json({ success: false, message: 'Email ou Senha inválidos' });
      } else if (req.body.password) {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) {
            res.json({ success: false, message: 'Email ou Senha inválidos' });
          }
          if (isMatch) {
            let token = jwt.sign(user.toObject(), config.JWT_PASSWORD, {
              expiresIn: '1 day'
            })
            res.json({ success: true, token: `Bearer ${token}` });
          } else {
            res.json({ success: false, message: 'Email ou Senha inválidos' });
          }
        });
      } else {
        res.json({ success: false, message: 'Email ou Senha inválidos' })
      }
    });
});

router.get('/session', (req, res) => res.json(req.user));

module.exports = router;
