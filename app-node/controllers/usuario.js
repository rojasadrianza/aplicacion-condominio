'use strict'

const { generate } = require('rxjs');
var Usuario = require('../models/usuario'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getUsuarioValida(req, res){      
 
  //validaToken(req, res);

  //const {email} = req.body;
  var email = req.params.email;
  const query = { correo: email };

  Usuario.findOne(query).exec((err, usuarios) => { 
    if (err){
      res.status(500).send({message: 'Error al devolver el marcador'});
    }else{
          if (!usuarios){
              res.status(404).send({message: 'No hay Usuario'});
          }else{
              res.status(200).send({message: 'Usuario existe'});  
          }        
    }
});

}

function getApartamentoValida(req, res){      
 
 
  
  var piso = req.params.piso;
  var apartamento = req.params.apartamento;

  const query = { apartamento: apartamento, piso:piso };

  Usuario.findOne(query).exec((err, usuarios) => { 
    if (err){
      res.status(500).send({message: 'Error al devolver el marcador'});
    }else{
          if (!usuarios){
              res.status(404).send({message: 'Apartamento no registrado'});
          }else{
              res.status(200).send({message: 'Apartamento registrado'});  
          }        
    }
});

}



function getUsuario(req, res){      
 
     validaToken(req, res);

     Usuario.find({}).sort('_id').exec((err, registros) => {	
         if (err){
                res.status(500).send({message: 'Error al devolver el marcador'});
          }else{
              if (!registros){
                res.status(404).send({message: 'No hay registros'});
              }else{
                res.status(200).send({registros});
              }
          }
     });
}

function saveUsuario(req, res){ 

//validaToken(req, res);

var usuario = new Usuario(); 
var params = req.body;

usuario.nombre = params.nombre,
usuario.correo = params.correo,
usuario.piso = params.piso,
usuario.apartamento = params.apartamento,
usuario.estatus = params.estatus,
usuario.tipo = params.tipo,
usuario.password = params.password

usuario.save((err, usuarioStored) => {
          if (err){
              res.status(500).send({message: 'Error al guardar el marcador'});
          }else{
              res.status(200).send({usuarioGuardado: usuarioStored});
          }
});

}		

function deleteUsuario(req, res){ 

  validaToken(req, res);

	var usuarioId = req.params.id;

    Usuario.findById(usuarioId, function(err,usuario){

    if (err){

       res.status(500).send({message: 'error al devolver el registro'})
    }

	    if (!usuario){
	       res.status(404).send({message: 'no hay marcador'})
	    }else{
        usuario.remove(err => {
	           if(err){
	             res.status(500).send({message: 'error al borrar'});
	           }else{
	             res.status(200).send({message: 'el registro se ha borrado'});
	           }
	        });

	    }

    });
	}

  function getUsuarios(req, res){ 
    
    validaToken(req, res);

    Usuario.find({}).sort('_id').exec((err, usuarios) => {	
        if (err){
               res.status(500).send({message: 'Error al devolver el marcador'});
         }else{
             if (!usuarios){
               res.status(404).send({message: 'No hay favoritos'});
             }else{
               res.status(200).send({usuarios});
             }
         }
    });
}

function updateUsuario(req, res){ 

  validaToken(req, res);

	var usuarioId = req.params.id;
    var update = req.body;
 
    console.log(update);

    Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) => {
         if(err){
           res.status(200).send({message: 'Error al actualizar el marcador'});
         }else{
           res.status(200).send({usuario: usuarioUpdate});
         }
         
     });	
	}

  function authUsuario(req, res){  
    
    const {username, password} = req.body;
    const query = { correo: username, password: password };
    const usuario = Usuario.findOne(query).exec((err, usuarios) => { 
          if (err){
            res.status(500).send({message: 'Error al devolver el marcador'});
          }else{
                if (!usuarios){
                    res.status(404).send({message: 'No hay Usuario'});
                }else{
                    //res.status(200).send({usuarios});
                    const user = {username: username};
                    const accessToken = generateAccessToken(user);

                    res.header('authorization',accessToken).json({
                      message: 'Usuario Autenticado',
                      token: accessToken
                    }) 

                }
          }
     });
    
}

//Funcion para generar el token
function generateAccessToken(user){
  return jwt.sign(user,process.env.SECRET, {expiresIn: process.env.MINUTE});

}

//Funcion que valida el token ya generado previamente y se encuentra en el valor 'Authorization' del header
//antes de realizar alguna operacion
function validaToken(req, res, next){
  //Usando ***req.query.accessToken***, le enviamos por URL el valor del token generado**********************************
  //Usando ***req.headers['authorization']***, se toma el valod de parametro AUTHORIZATION del header  

  //const accessToken = req.headers['authorization'] || req.query.accessToken;
  const accessToken = req.query.accessToken;

  if (!accessToken) res.send('Acceso Denegado');
  jwt.verify(accessToken, process.env.SECRET,(err, user) =>{
    if (err){
        res.send('Acceso denegado token expiro o es incorrecto');        
    }
    return;
  });

}



module.exports = {	
	getUsuario,
	getUsuarios,
	saveUsuario,
	updateUsuario,
	deleteUsuario,
  authUsuario,
  getUsuarioValida,
  getApartamentoValida
};