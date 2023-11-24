const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vocabulario = new Schema({
    esp: String,
    elf: String
});

module.exports = mongoose.model('Diccionario', vocabulario);