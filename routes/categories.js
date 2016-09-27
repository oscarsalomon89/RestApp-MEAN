var Category = require('../models/category');
/* GET categorys listing. */

exports.store = function(req,callback){
   if(req._id == null){
      //Inserta      
      var category = new Category({
         name: req.name,
         description: req.description
      });
      category.save(function(error,category){
         if(error){
            return callback(error,null);
         }else{
         	return callback(null,category);
         }
      });
   }else{
      //Modifica
      Category.findById(req._id, function(error, documento){
         if(error){
            return callback(error,null);
         }else{
            var category = documento;
            category.name = req.name;
            category.description = req.description;

            category.save(function(error, documento){
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
      Category
      .find()
      .populate('item')
      .exec(function(error,items){
         if(error){
            return callback(error, null);
         }else{
            return callback(null, items);
         }
      });
		/*Category.find({}, function(error,categories){
	      if(error){
	         return callback(error, null);
	      }else{
	         return callback(null, categories);
	      }
	   });*/
	}else{
		//Obtiene el usuario por id
		Category.findById(id, function(error, category){
	      if(error){
	         return callback(error, null);
	      }else{
	         return callback(null, category);
	      }
	   });
	}	
};

exports.eliminar = function (id,callback){
	Category.remove({_id: id}, function(error){
      if(error){
         return callback(error, null);
      }else{
         return callback(null,'ok');
      }
   });
}