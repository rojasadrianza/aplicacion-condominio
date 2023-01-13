'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema ({
	nombre: String,
	correo: String,
	piso: Number,
	apartamento: Number,
	estatus: Number,
	tipo: Number,
	password: String
});

var cuentasClientes = Schema ({
    piso: Number,
	apartamento: Number,
	monto: Number
});	

var parametros =  Schema ({
    nombreParametro: String,
	valorParametro: String
}); 

var menu = Schema ({
    nombreOpcion: String,
	direccionOpcion: String,
    tipo: Number
}); 	

module.exports = mongoose.model('Usuario', UsuarioSchema);