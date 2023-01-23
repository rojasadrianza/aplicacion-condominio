'use strict'


var UsuarioController  = require('../controllers/usuario');
var CondominioController  = require('../controllers/condominio');
var express = require('express');
var api = express.Router();
const multer  = require('multer');

//Manejo datos usuario
api.get('/usuario', UsuarioController.getUsuario); //el id lo tomo el token
api.get('/usuarios', UsuarioController.getUsuarios);
api.post('/usuario/', UsuarioController.saveUsuario);
api.put('/usuario/:id', UsuarioController.updateUsuario);
api.delete('/usuario/:id', UsuarioController.deleteUsuario);
api.post('/usuarioAuth/', UsuarioController.authUsuario);
api.get('/usuarioValida/:email', UsuarioController.getUsuarioValida);
api.get('/apartamentoValida/:apartamento&:piso', UsuarioController.getApartamentoValida);
api.put('/usuarioValida/:id', UsuarioController.updatetUsuarioValida);

//Manejo datos condominio
//Carga archivo
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'datos/')
    },
    filename: function (req, file, cb) {
      cb(null, 'datos.xlsx')
    }
  })
  var upload = multer({ storage: storage })

  api.post('/datos/', upload.single('file'), function(req, res) {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 401
    return res.status(401).send({});   //next(error)
  }
    res.send(file)    
});


api.post('/condominio/', CondominioController.cargarDatos)
api.get('/condominio/Cuentas', CondominioController.getCuentas);
api.post('/condominio/parametros', CondominioController.saveParametro);
api.get('/condominio/parametros', CondominioController.getParametros);
api.delete('/condominio/parametro/:id', CondominioController.deleteParametro);
api.get('/condominio/parametro/:id', CondominioController.getParametro);
api.put('/condominio/parametro', CondominioController.putParametro);

module.exports = api;