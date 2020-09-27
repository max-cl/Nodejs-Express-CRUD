const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = { 
	get_todo: Joi.object().keys({ 
        id_user: constants.id_user_validation
	}),

	create_todo: Joi.object().keys({ 
        id_user: constants.id_user_validation,
        title: constants.title_validation
	}),

	update_todo: Joi.object().keys({ 
        id_user: constants.id_user_validation,
        title: constants.title_validation,
        id: constants.id_validation,
        done: constants.done_validation
	}),

	delete_todo: Joi.object().keys({ 
        id_user: constants.id_user_validation,
        id: constants.id_validation
	})
}; 

module.exports = schemas;