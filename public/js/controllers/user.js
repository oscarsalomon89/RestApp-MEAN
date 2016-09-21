angular.module("app")
.controller('userController', function($http) {
   var vm = this;
   vm.currentPage = 1;
   vm.pageSize = 10;
   $('#estadisticas').removeClass("active");
   $('#item').removeClass("active");
   $('#order').removeClass("active");
   $('#user').addClass("active");

   vm._id = null;
   vm.name = '';
   vm.username = '';
   vm.address = '';
   vm.phone = '';
   vm.password = '';
   vm.rol = '';
   vm.users = [];

   vm.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
  
   vm.cargarUsuarios = function(){
      $http({
         method: 'GET', url: '/listar'
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            vm.users = data;
         }else{
            alert('Error al intentar recuperar los clientes.');
         }
      }).
      error(function() {
         alert('Error al intentar recuperar los clientes.');
      });
   };

   vm.guardarUsuario = function() {
      $http({
         method: 'POST',
         url: '/guardar',
         params: {
            username: vm.username,
            name: vm.name,
            address: vm.address,
            phone: vm.phone,
            rol: vm.id_rol,
            email: vm.password,
            _id: vm._id
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            vm.limpiarDatos();
            vm.cargarUsuarios(); 
            $('#myModal').modal('toggle');
         }else{
            alert('Error al intentar guardar el cliente.');
         }
      }).
      error(function() {
         alert('Error al intentar guardar el cliente.');
      });
   };

   vm.recuperarUsuario = function(indice) {
      $http({
         method: 'GET',
         url: '/recuperar',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $('#myModal').modal();
            vm._id = data._id;
            vm.username = data.username;
            vm.name = data.name;
            vm.address = data.address;
            vm.phone = data.phone;
            vm.id_rol = data.id_rol;
         }else{
            alert('Error al intentar recuperar el cliente.');
         } 
      }).
      error(function() {
         alert('Error al intentar recuperar el cliente.');
      });
   };

   vm.eliminarUsuario = function(indice) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function() {
         $http({
         method: 'POST',
         url: '/eliminar',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(data.error == false){
            swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
            vm.limpiarDatos();
            vm.cargarUsuarios();
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
      vm.username = '';
      vm.name = '';
      vm.address = '';
      vm.phone = '';
      vm.password = '';
   };

    vm.nuevoUsuario = function() {
      vm._id = null;
	   $('#myModal').modal(); 
	   $('#form #logOculto').show();
	   $('.errors_form').html("");
	   $('#mensaje').hide();
	   $('#form')[0].reset();
	   $('#form #id_usuario').val("");
	   $('#myModalLabel').html('Nuevo Usuario');
	}

    });