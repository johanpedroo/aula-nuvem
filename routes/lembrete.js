const express = require('express');
const router = express.Router();
const lembreteController = require('../controllers/lembreteController.js');

/*
 * MIDDLEWARE
 */
router.use((req, res, next ) => {
let query = {};  

if(req.query.where)
  query.where = JSON.parse(req.query.where);

if(req.query.fields)
  query.fields = JSON.parse(req.query.fields);

if(req.query.sort)
  query.sort = {sort : JSON.parse(req.query.sort)};
else
  query.sort = {};

if(req.query.limit)
  query.sort.limit = parseInt(req.query.limit);

if(req.query.skip)
  query.sort.skip = parseInt(req.query.skip);

req.query = query;

next();
})

/*
 * GET
 */
router.get('/', (req, res) => {
  lembreteController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', (req, res) => {
  lembreteController.show(req, res);
});

/*
 * POST
 */
router.post('/', (req, res) => {
  lembreteController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', (req, res) => {
  lembreteController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', (req, res) => {
  lembreteController.remove(req, res);
});

module.exports = router;
