const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {	'nome' : String,	'quantidade' : Number}

let produtoSchema = new Schema(fields);

module.exports = mongoose.model('produto', produtoSchema);
