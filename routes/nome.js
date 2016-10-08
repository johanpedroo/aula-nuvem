const express = require('express');
const router = express.Router();



/*
 * GET
 */
router.get('/:nome/:sobrenome', (req, res) => {
  res.send(`Seu nome completo é ${req.params.nome || ""} ${req.params.sobrenome || ""}`)
});


router.post('/', (req, res) => {
  res.send(`Seu nome completo é ${req.body.nome || ""} ${req.body.sobrenome || ""}`)
});

module.exports = router;
