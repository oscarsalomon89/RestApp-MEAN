angular.module("app")
.controller('categoryController', function($http) {
   var vm = this;
   vm.currentPage = 1;
   vm.pageSize = 10;

   vm._id = null;
   vm.name = '';
   vm.description = '';
   vm.categories = [];
   $('#estadisticas').removeClass("active");
   $('#user').removeClass("active");
   $('#order').removeClass("active");
   $('#item').removeClass("active");
   $('#cat').addClass("active");
  
   vm.cargarCategorias = function(){
      $http({
         method: 'GET', url: '/listarCategorias'
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            vm.categories = data;
         }else{
            alert('Error al intentar recuperar los clientes.');
         }
      }).
      error(function() {
         alert('Error al intentar recuperar los clientes.');
      });
   };

   vm.guardarCategoria = function() {
      $http({
         method: 'POST',
         url: '/guardarCategoria',
         params: {
            name: vm.name,
            description: vm.description,
            _id: vm._id
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            vm.limpiarDatos();
            vm.cargarCategorias(); 
            $('#myModal').modal('toggle');
         }else{
            alert('Error al intentar guardar el cliente.');
         }
      }).
      error(function() {
         alert('Error al intentar guardar el cliente.');
      });
   };

   vm.recuperarCategoria = function(indice) {
      $http({
         method: 'GET',
         url: '/recuperarCategoria',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $('#myModal').modal();
            vm._id = data._id;
            vm.name = data.name;
            vm.description = data.description;
         }else{
            alert('Error al intentar recuperar el cliente.');
         } 
      }).
      error(function() {
         alert('Error al intentar recuperar el cliente.');
      });
   };

   vm.eliminarCategoria = function(indice) {
      swal({
        title: 'Esta seguro?',
        text: "Va a aliminar la categoria seleccionada!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si eliminar!'
      }).then(function() {
         $http({
         method: 'POST',
         url: '/eliminarCategoria',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(data.error == false){
            swal(
                'Eliminado!',
                'La categoria se eliminó correctamente.',
                'success'
              );
            vm.limpiarDatos();
            vm.cargarCategorias();
         }else{
            alert('Error al intentar eliminar el cliente.');
         } 
      }).
      error(function() {
         alert('Error al intentar eliminar el cliente.');
      })        
      })     
   };

   vm.limpiarDatos = function() {
      vm._id = null;
      vm.name = '';
      vm.description = '';
   };

    vm.nuevaCategoria = function() {
      vm._id = null;
	   $('#myModal').modal(); 
	   $('#form #logOculto').show();
	   $('.errors_form').html("");
	   $('#mensaje').hide();
	   $('#form')[0].reset();
	   $('#myModalLabel').html('Nuevo Item');
	}

    });