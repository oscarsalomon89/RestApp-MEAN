var User 	= require('../models/user');
var bcrypt  = require('bcrypt-nodejs');

/* GET users listing. */

exports.store = function(req,callback){
   if(req._id == null){
      //Inserta
      //encriptacion del password
      var salt = bcrypt.genSaltSync();
   	  var password_hash = bcrypt.hashSync(req.password,salt);
      
      var user = new User({
         username: req.username,
         name: req.name,
         address: req.address,
         phone: req.phone,
         password: password_hash,
         rol: req.rol
      });
      user.save(function(error,user){
         if(error){
            return callback(error,null);
         }else{
         	return callback(null,user);
         }
      });
   }else{
      //Modifica
      User.findById(req._id, function(error, documento){
         if(error){
            return callback(error,null);
         }else{
            var user = documento;
            user.username = req.username;
            user.name = req.name;
            user.address = req.address;
            user.phone = req.phone;
            user.rol = req.rol;
            user.save(function(error, documento){
               if(error){
                  return callback(error,null);
               }else{ 
                  return callback(null,documento);
               }
            });
         }
      });
   }
};

exports.mostrar = function(id,callback){
	if(id == null){
		//Obtiene todos los usuarios
		User.find({}, function(error,users){
	      if(error){
	         return callback(error, null);
	      }else{
	         return callback(null, users);
	      }
	   });
	}else{
		//Obtiene el usuario por id
		User.findById(id, function(error, user){
	      if(error){
	         return callback(error, null);
	      }else{
	         return callback(null, user);
	      }
	   });
	}	
};

exports.eliminar = function (id,callback){
	User.remove({_id: id}, function(error){
      if(error){
         return callback(error, null);
      }else{
         return callback(null,'ok');
      }
   });
}