var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser 	= require('body-parser');
var mongoose 	  = require('mongoose');
var User 	  = require('./models/user');
var usersController = require('./routes/users');
var itemsController = require('./routes/items');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

mongoose.connect('mongodb://localhost/base_restApp', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});


app.get('/listar', function(req, res){
   usersController.mostrar(null, function (err, users) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send(users);
        }       
    });
});

app.get('/listarItems', function(req, res){
   itemsController.mostrar(null, function (err, users) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send(users);
        }       
    });
});

app.post('/guardarItem', function (req, res) {
    itemsController.store(req.query, function (err, item) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send(item);
        }       
    });    
  });

app.get('/recuperarItem', function(req, res){
   itemsController.mostrar(req.query._id, function (err, item) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send(item);
        }       
    });
});

app.get('/recuperar', function(req, res){
   usersController.mostrar(req.query._id, function (err, user) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send(user);
        }       
    });
});


app.post('/guardar', function (req, res) {
    usersController.store(req.query, function (err, user) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send(user);
        }       
    });    
  });

app.post('/eliminarItem', function(req, res){
   itemsController.eliminar(req.query._id, function (err, user) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send({ 'error': false});
        }       
    }); 
});

app.post('/eliminar', function(req, res){
   usersController.eliminar(req.query._id, function (err, user) {
        if (err){
          res.send({ 'error': true, 'err': error});
        }else{
          res.send({ 'error': false});
        }       
    }); 
});

app.get('/', function(req, res){
   res.sendFile(__dirname +'/views/index.html');
});

app.get('/home', function(req, res){
   res.sendFile(__dirname +'/views/home.html');
});

//app.use('/users', users);

app.get('/users', function(req, res){
   res.sendFile(__dirname +'/views/users/index.html');
});

app.get('/items', function(req, res){
   res.sendFile(__dirname +'/views/items/index.html');
});

app.get('/contacto', function(req, res){
   res.sendFile(__dirname +'/views/contacto.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});