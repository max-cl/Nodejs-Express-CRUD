const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = { 
	get_product: Joi.object().keys({ 
        id_user: constants.id_user_validation
	}),

	create_product: Joi.object().keys({ 
        id_user: constants.id_user_validation,
        name_product: constants.name_product_validation
	}),

	update_product: Joi.object().keys({ 
        id_user: constants.id_user_validation,
        name_product: constants.name_product_validation,
        id_product: constants.id_product_validation
	}),

	delete_product: Joi.object().keys({ 
        id_user: constants.id_user_validation,
        id_product: constants.id_product_validation
	})
}; 

module.exports = schemas;