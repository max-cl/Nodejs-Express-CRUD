const middlewareValidator = require('../validator/middleware.validator');
const schemas = require('../validator/schemas/todo.schema');

module.exports = function(app) {

    const todoController = require('../controller/todo.controller');
    
    app.get('/api/get_todo/:id_user', middlewareValidator.middlewareValidatorParams(schemas.get_todo, 'params'), todoController.getTodo);
    app.post('/api/create_todo/', middlewareValidator.middlewareValidatorBody(schemas.create_todo, 'body'), todoController.createTodo);
    app.put('/api/update_todo/', middlewareValidator.middlewareValidatorBody(schemas.update_todo, 'body'), todoController.updateTodo);
    app.delete('/api/delete_todo/:id_user/:id', middlewareValidator.middlewareValidatorParams(schemas.delete_todo, 'params'), todoController.deleteTodo);

}