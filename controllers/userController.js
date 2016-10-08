const userModel = require('../models/userModel.js');

/**
 * clienteController.js
 *
 * @description :: Server-side logic for managing clientes.
 */
module.exports = {

  /**
   * clienteController.list()
   */
  list: (req, res) => {
    userModel.find(req.query.where, req.query.fields, req.query.sort, (err, clientes) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting cliente.',
          error: err
        });
      }
      return res.json(clientes);
    });
  },

  /**
   * clienteController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    userModel.findOne({_id: id}, (err, cliente) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting cliente.',
          error: err
        });
      }
      if (!cliente) {
        return res.status(404).json({
          message: 'No such cliente'
        });
      }
      return res.json(cliente);
    });
  },

  /**
   * clienteController.create()
   */
  create: (req, res) => {
    let cliente = new userModel({
			name : req.body.name,
			email : req.body.email,
			password : req.body.password,
			idContrato : req.body.idContrato,
      usuario : req.body.usuario,
      passFirebird : req.body.passFirebird,
			createdAt : req.body.createdAt,
			active : req.body.active
    });

    cliente.save((err, cliente) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating cliente',
          error: err
        });
      }
      return res.status(201).json(cliente);
    });
  },

  /**
   * clienteController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    userModel.findOne({_id: id}, (err, cliente) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting cliente',
          error: err
        });
      }
      if (!cliente) {
        return res.status(404).json({
          message: 'No such cliente'
        });
      }

      cliente.name = req.body.name ? req.body.name : cliente.name;
			cliente.email = req.body.email ? req.body.email : cliente.email;
			cliente.password = req.body.password ? req.body.password : cliente.password;
			cliente.idContrato = req.body.idContrato ? req.body.idContrato : cliente.idContrato;
			cliente.createdAt = req.body.createdAt ? req.body.createdAt : cliente.createdAt;
			cliente.active = req.body.active ? req.body.active : cliente.active;
			
      cliente.save( (err, cliente) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating cliente.',
            error: err
          });
        }

        return res.json(cliente);
      });
    });
  },

  /**
   * clienteController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    userModel.findByIdAndRemove(id, (err, cliente) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the cliente.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
