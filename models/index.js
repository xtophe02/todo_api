var mongoose = require('mongoose');
var url = process.env.DATABASEURL || "mongodb://localhost/todo-api";

mongoose.set('debug',true);
mongoose.connect(url, {useMongoClient: true});

mongoose.Promise = Promise; //allow to use .then or .catch

module.exports.Todo = require('./todo');
