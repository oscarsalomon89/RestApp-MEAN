var Item 	= require('../models/item');

/* GET items listing. */

exports.store = function(req,callback){
   if(req._id == null){
      //Inserta      
      var item = new Item({
         name: req.name,
         description: req.description,
         category: req.category,
         price: req.price
      });
      item.save(function(error,item){
         if(error){
            return callback(error,null);
         }else{
         	return callback(null,item);
         }
      });
   }else{
      //Modifica
      Item.findById(req._id, function(error, documento){
         if(error){
            return callback(error,null);
         }else{
            var item = documento;
            item.name = req.name;
            item.description = req.description;
            item.category = req.category;
            item.price = req.price;

            item.save(function(error, documento){
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
		Item.find({}, function(error,items){
	      if(error){
	         return callback(error, null);
	      }else{
	         return callback(null, items);
	      }
	   });
	}else{
		//Obtiene el usuario por id
		Item.findById(id, function(error, item){
	      if(error){
	         return callback(error, null);
	      }else{
	         return callback(null, item);
	      }
	   });
	}	
};

exports.eliminar = function (id,callback){
	Item.remove({_id: id}, function(error){
      if(error){
         return callback(error, null);
      }else{
         return callback(null,'ok');
      }
   });
}