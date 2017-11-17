var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test@ds111476.mlab.com:11476/todo-list')

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(request, response){
    response.render('todo', {todos: data});
  });
  
  app.post('/todo', urlencodedParser, function(request, response){
    data.push(request.body);
    response.json(data);
  });
  

  app.delete('/todo/:item', function(request, response){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== request.params.item;
    });
    response.json(data);
  });
};