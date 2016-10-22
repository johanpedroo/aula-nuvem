const lembreteModel = require('../models/lembreteModel.js');

/**
 * lembreteController.js
 *
 * @description :: Server-side logic for managing lembretes.
 */
module.exports = {

  /**
   * lembreteController.list()
   */
  list: (req, res) => {
    lembreteModel.find(req.query.where, req.query.fields, req.query.sort, (err, lembretes) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting lembrete.',
          error: err
        });
      }
      return res.json(lembretes);
    });
  },

  /**
   * lembreteController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    lembreteModel.findOne({_id: id}, (err, lembrete) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting lembrete.',
          error: err
        });
      }
      if (!lembrete) {
        return res.status(404).json({
          message: 'No such lembrete'
        });
      }
      return res.json(lembrete);
    });
  },

  /**
   * lembreteController.create()
   */
  create: (req, res) => {
    let lembrete = new lembreteModel({			lembrete : req.body.lembrete
    });

    lembrete.save((err, lembrete) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating lembrete',
          error: err
        });
      }
      return res.status(201).json(lembrete);
    });
  },

  /**
   * lembreteController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    lembreteModel.findOne({_id: id}, (err, lembrete) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting lembrete',
          error: err
        });
      }
      if (!lembrete) {
        return res.status(404).json({
          message: 'No such lembrete'
        });
      }

      lembrete.lembrete = req.body.lembrete ? req.body.lembrete : lembrete.lembrete;			
      lembrete.save( (err, lembrete) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating lembrete.',
            error: err
          });
        }

        return res.json(lembrete);
      });
    });
  },

  /**
   * lembreteController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    lembreteModel.findByIdAndRemove(id, (err, lembrete) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the lembrete.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
