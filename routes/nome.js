const express = require('express');
const router = express.Router();



/*
 * GET
 */
router.get('/:nome/:sobrenome', (req, res) => {
  res.send(`Seu nome completo é ${req.params.nome} ${req.params.sobrenome}`)
});

module.exports = router;
