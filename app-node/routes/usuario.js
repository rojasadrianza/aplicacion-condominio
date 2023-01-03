'use strict'


var UsuarioController  = require('../controllers/usuario');
var express = require('express');
var api = express.Router();

api.get('/usuario/:id', UsuarioController.getUsuario);
api.get('/usuarios', UsuarioController.getUsuarios);
api.post('/usuario/', UsuarioController.saveUsuario);
api.put('/usuario/:id', UsuarioController.updateUsuario);
api.delete('/usuario/:id', UsuarioController.deleteUsuario);
api.post('/usuarioAuth/', UsuarioController.authUsuario);
api.get('/usuarioValida/:email', UsuarioController.getUsuarioValida);
api.get('/apartamentoValida/:apartamento&:piso', UsuarioController.getApartamentoValida);

module.exports = api;