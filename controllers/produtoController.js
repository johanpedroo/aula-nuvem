const produtoModel = require('../models/produtoModel.js');

/**
 * produtoController.js
 *
 * @description :: Server-side logic for managing produtos.
 */
module.exports = {

  /**
   * produtoController.list()
   */
  list: (req, res) => {
    produtoModel.find(req.query.where, req.query.fields, req.query.sort, (err, produtos) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting produto.',
          error: err
        });
      }
      return res.json(produtos);
    });
  },

  /**
   * produtoController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    produtoModel.findOne({_id: id}, (err, produto) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting produto.',
          error: err
        });
      }
      if (!produto) {
        return res.status(404).json({
          message: 'No such produto'
        });
      }
      return res.json(produto);
    });
  },

  /**
   * produtoController.create()
   */
  create: (req, res) => {
    let produto = new produtoModel({			nome : req.body.nome,			quantidade : req.body.quantidade
    });

    produto.save((err, produto) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating produto',
          error: err
        });
      }
      return res.status(201).json(produto);
    });
  },

  /**
   * produtoController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    produtoModel.findOne({_id: id}, (err, produto) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting produto',
          error: err
        });
      }
      if (!produto) {
        return res.status(404).json({
          message: 'No such produto'
        });
      }

      produto.nome = req.body.nome ? req.body.nome : produto.nome;			produto.quantidade = req.body.quantidade ? req.body.quantidade : produto.quantidade;			
      produto.save( (err, produto) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating produto.',
            error: err
          });
        }

        return res.json(produto);
      });
    });
  },

  /**
   * produtoController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    produtoModel.findByIdAndRemove(id, (err, produto) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the produto.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
