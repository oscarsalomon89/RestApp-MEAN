angular.module("app", ["ngRoute",'angularUtils.directives.dirPagination'])
    .config(function($routeProvider){
        $routeProvider
            .when("/", {
                controller: "mainController",
                controllerAs: "vm",
                templateUrl: "home"
            })
            .when("/users", {
                controller: "userController",
                controllerAs: "vm",
                templateUrl: "users"
            })
            .when("/items", {
                controller: "itemController",
                controllerAs: "vm",
                templateUrl: "items"
            })
            .when("/contacto", {
                controller: "orderController",
                controllerAs: "vm",
                templateUrl: "contacto"
            })
            .when("/categorias", {
                controller: "categoryController",
                controllerAs: "vm",
                templateUrl: "categorias"
            });
    })
    .controller('mainController', function() {
    this.message = 'Hola, Mundo!';
    });  
    