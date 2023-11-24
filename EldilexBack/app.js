const express = require('express');

const mongoose = require('mongoose');

const Diccionario = require('./model');

const connect = mongoose.connect('mongodb://127.0.0.1:27017/Eldilex');
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    const palabra = await Diccionario.findOne(req.body);
    res.json(palabra);
  });

 app.post('/', async (req, res) => {
    const palabra = await Diccionario.create(req.body);
    res.json(palabra);
 });

  app.delete('/', async (req, res) => {
    const palabra = await Diccionario.findOneAndDelete(req.body);
    res.send(palabra);
  });

  app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000.');
  });

