const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {

let lembreteSchema = new Schema(fields);

module.exports = mongoose.model('lembrete', lembreteSchema);