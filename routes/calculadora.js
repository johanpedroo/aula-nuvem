const express = require('express');
const router = express.Router();



/*
 * GET
 */
router.get('/soma/:a/:b', (req, res) => {
  let num1 = parseInt(req.params.a) || 0;
  let num2 = parseInt(req.params.b) || 0;
  if(isNaN(num1) || isNaN(num2))
    return res.send('O valor informado não é um número');
  else
    res.send(`${num1} + ${num2} = ${num1+num2}`)
});

router.get('/sub/:a/:b', (req, res) => {
  let num1 = parseInt(req.params.a) || 0;
  let num2 = parseInt(req.params.b) || 0;
  if(isNaN(num1) || isNaN(num2))
    return res.send('O valor informado não é um número');
  else
    res.send(`${num1} - ${num2} = ${num1-num2}`)
});


router.post('/multi', (req, res) => {
  console.log(req.body)
  let num1 = parseInt(req.body.a) || 0;
  let num2 = parseInt(req.body.b) || 0;
  if(isNaN(num1) || isNaN(num2))
    return res.send('O valor informado não é um número');
  else
    res.send(`${num1} * ${num2} = ${num1*num2}`)
});

router.post('/div', (req, res) => {
  let num1 = parseInt(req.body.a) || 0;
  let num2 = parseInt(req.body.b) || 0;

  if(num2 == 0)
    res.send('Operação não permitida')

  if(isNaN(num1) || isNaN(num2))
    return res.send('O valor informado não é um número');
  else
    res.send(`${num1} / ${num2} = ${num1/num2}`)
});

module.exports = router;
