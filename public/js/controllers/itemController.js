angular.module("app")
.controller('itemController', function($http) {
   var vm = this;
   vm.currentPage = 1;
   vm.pageSize = 10;

   vm._id = null;
   vm.name = '';
   vm.description = '';
   vm.price = '';
   vm.items = [];
   $('#estadisticas').removeClass("active");
   $('#user').removeClass("active");
   $('#order').removeClass("active");
   $('#item').addClass("active");
  
   vm.cargarItems = function(){
      $http({
         method: 'GET', url: '/listarItems'
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            vm.items = data;
         }else{
            alert('Error al intentar recuperar los clientes.');
         }
      }).
      error(function() {
         alert('Error al intentar recuperar los clientes.');
      });
   };

   vm.guardarItem = function() {
      $http({
         method: 'POST',
         url: '/guardarItem',
         params: {
            name: vm.name,
            description: vm.description,
            price: vm.price,
            _id: vm._id
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            vm.limpiarDatos();
            vm.cargarItems(); 
            $('#myModal').modal('toggle');
         }else{
            alert('Error al intentar guardar el cliente.');
         }
      }).
      error(function() {
         alert('Error al intentar guardar el cliente.');
      });
   };

   vm.recuperarItem = function(indice) {
      $http({
         method: 'GET',
         url: '/recuperarItem',
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
            vm.price = data.price;
         }else{
            alert('Error al intentar recuperar el cliente.');
         } 
      }).
      error(function() {
         alert('Error al intentar recuperar el cliente.');
      });
   };

   vm.eliminarItem = function(indice) {
      swal({
        title: 'Esta seguro?',
        text: "Va a aliminar el item que selecciono!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si eliminarlo!'
      }).then(function() {
         $http({
         method: 'POST',
         url: '/eliminarItem',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(data.error == false){
            swal(
                'Eliminado!',
                'El item se eliminó correctamente.',
                'success'
              );
            vm.limpiarDatos();
            vm.cargarItems();
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
      vm.price = '';
   };

    vm.nuevoItem = function() {
      vm._id = null;
	   $('#myModal').modal(); 
	   $('#form #logOculto').show();
	   $('.errors_form').html("");
	   $('#mensaje').hide();
	   $('#form')[0].reset();
	   $('#myModalLabel').html('Nuevo Item');
	}

    });