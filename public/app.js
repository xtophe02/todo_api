/* global $ */
$(document).ready(function(){//jquery wait to load the page
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch(function(err){
	    console.log(err);
	})

	$('#todoInput').keypress(function(ev){
	    if(ev.which === 13){
	        createTodo($(this).val());
	        $(this).val("");
	    }
	})
    $('.list').on('click','li', function(){
        updateTodo($(this));
    });
    $('.list').on('click','span',function(ev){//span won't work because isn't there when the page loads
        ev.stopPropagation();
        deleteTodo($(this).parent());
    })
});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);

    });    
    
}

function addTodo(todo){
    
    var newTodo;
    newTodo = $('<li>'+todo.name+'<span>X</span></li>');
    newTodo.data('id',todo._id);
    newTodo.data('completed',todo.completed);
    newTodo.addClass('task');
    if(todo.completed){
        newTodo.addClass("done")
    }
    $('.list').append(newTodo);
    
}

function createTodo(todoInput){
    $.post('api/todos', {name:todoInput})
    .then(function(newTodo){
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    })
}

function deleteTodo(todo){

    var deleteUrl = '/api/todos/'+todo.data('id');
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove(); 
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTodo(todo){
    var updateUrl = '/api/todos/'+todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed:isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTod){
        todo.toggleClass('done'); 
        todo.data('completed', isDone); 
        console.log(updatedTod);
    })
    .catch(function(err){
        console.log(err);
    })
}