const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {

let produtoSchema = new Schema(fields);

module.exports = mongoose.model('produto', produtoSchema);