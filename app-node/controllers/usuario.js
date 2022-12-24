'use strict'

var Usuario = require('../models/usuario'); 

function getUsuario(req, res){      
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
              res.status(200).send({favorito: usuarioStored});
          }
});

}		

function deleteUsuario(req, res){ 
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

module.exports = {	
	getUsuario,
	getUsuarios,
	saveUsuario,
	updateUsuario,
	deleteUsuario
};