const Joi = require('joi');

const schemas = { 
	signup: Joi.object().keys({ 
		name: Joi.string()
		    .alphanum()
		    .min(3)
		    .max(30)
		    .required(),

		username: Joi.string()
		    .alphanum()
		    .min(3)
		    .max(30)
		    .required()
		    .error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Username should not be empty.";
			          		break;
				        case "string.alphanum":
					        err.message = "Username not valid. It is not allow to use special characters (@%$#/,etc.).";
					        break;
				        case "string.min":
					        err.message = `Value should have at least ${err.context.limit} characters!`;
					        break;
				        case "string.max":
					        err.message = `Value should have at most ${err.context.limit} characters!`;
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			}),

		password: Joi.string()
			.alphanum()
			.min(8)
		    .max(30)
			//.regex(/^[a-zA-Z0-9]{3,30}$/)
			.required()
			.error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Password should not be empty.";
			          		break;
				        case "string.alphanum":
					        err.message = "Password not valid. It is not allow to use special characters (@%$#/,etc.).";
					        break;
				        case "string.min":
					        err.message = `Value should have at least ${err.context.limit} characters!`;
					        break;
				        case "string.max":
					        err.message = `Value should have at most ${err.context.limit} characters!`;
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			}),

		repeat_password: Joi.ref('password'),

		roles: Joi.string()
			.required()
			.valid('Admin', 'Role_1','Role_2'),

        email: Joi.string()
			.email({ tldWhitelist: ['com', 'net', 'dk', 'de'] })
        	.required(),
		
		description: Joi.string()
			.min(0)
			.max(50)
	})
	.with('password', 'repeat_password'), 

	signin: Joi.object().keys({ 
		username: Joi.string()
		    .alphanum()
		    // .min(3)
		    // .max(30)
		    .required()
		    .error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Username should not be empty.";
			          		break;
			          	case "string.alphanum":
					        err.message = "Not valid.";
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			}),

		password: Joi.string()
			.alphanum()
			// .regex(/^[a-zA-Z0-9]{3,30}$/)
			.required()
			.error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Password should not be empty.";
			          		break;
			          	case "string.alphanum":
					        err.message = "Not valid.";
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			})
	})
	.with('username', 'password'),

	forgotpassword: Joi.object().keys({ 
	 	email: Joi.string()
			.email({ tldWhitelist: ['com', 'net', 'dk'] })
        	.required()
        	.error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Email should not be empty.";
			          		break;
				        case "string.email":
					        err.message = "Email not valid.";
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			})
	}),

	updatepasswordviaemail: Joi.object().keys({ 
		username: Joi.string()
		    .alphanum()
		    // .min(3)
		    // .max(30)
		    .required()
		    .error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Username should not be empty.";
			          		break;
			          	case "string.alphanum":
					        err.message = "Not valid.";
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			}),

		password: Joi.string()
			.alphanum()
			.min(8)
		    .max(30)
			//.regex(/^[a-zA-Z0-9]{3,30}$/)
			.required()
			.error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Password should not be empty.";
			          		break;
				        case "string.alphanum":
					        err.message = "Password not valid. It is not allow to use special characters (@%$#/,etc.).";
					        break;
				        case "string.min":
					        err.message = `Value should have at least ${err.context.limit} characters!`;
					        break;
				        case "string.max":
					        err.message = `Value should have at most ${err.context.limit} characters!`;
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			}),

		resetpasswordtoken: Joi.string()
		    .alphanum()
		    .required()
		    .error(errors => {
			    errors.forEach(err => {
				    switch (err.type) {
				        case "any.empty":
			          		err.message = "Error: Please try again to reset the password.";
			          		break;
			          	case "string.alphanum":
					        err.message = "Error: Please try again to reset the password.";
					        break;
				        default:
				        	break;
				    }
				});
				return errors;
			})
	})
}; 

module.exports = schemas;