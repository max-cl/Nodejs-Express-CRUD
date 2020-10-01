const passport = require('passport');

//Models
const db = require('../config/db.config');
const Todo = db.todo;

//Helpers
const helper = require('../helper');


exports.getTodo = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                const { id_user } = req.params;
		const todo = await Todo.findAll({
                    where: {
                        id_user
                    }
                });
                
                if (todo.length > 0) {
                    const data = helper.Helper_1(todo);
                    console.log('DATA: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is not todo for this user');
                    res.status(404).send('There is not todo for this user');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};


exports.createTodo = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {

                const { id_user, title } = req.body;
                const newTodo = await Todo.create({ title, id_user, done: false });
                console.log('DATA: ', newTodo.dataValues);
                res.status(200).json(newTodo);

            } catch (e) {
                console.error(e);
            }   
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};


exports.updateTodo = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                
                const { title, id, done } = req.body;
                const updateTodo = await Todo.update({ title, done }, {
                    where: {
                        id
                    }
                });
                
                if(updateTodo[0] === 1){
                    console.log('Todo updated.',);
                    res.status(200).json({ message: 'Todo updated.' });
                } else {
                    console.log('The Todo doesn\'t exist.');
                    res.status(200).json({ message: 'The Todo ID: '+id+' doesn\'t exist.' });
                }
            } catch (e) {
                console.error(e);
            }   
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};



exports.deleteTodo = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                const { id } = req.params;
                const deletedTodo = await Todo.destroy({
                    where: {
                        id
                    }
                });

 
                if(deletedTodo === 1){
                    console.log('Todo deleted.',);
                    res.status(200).json({ message: 'Todo deleted.' });
                } else {
                    console.log('The Todo doesn\'t exist.');
                    res.status(200).json({ message: 'The Todo ID: '+id+' doesn\'t exist.' });
                }
            } catch (e) {
                console.error(e);
            }   
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
