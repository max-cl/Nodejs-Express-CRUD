const Joi = require('joi');

const constants = {

    /*another_validation_1: Joi.string().required(),
    another_validation_2: Joi.string()
        .regex(/(^[0]+$)|(^[1]+$)|(^[2]+$)|(^[1-2]+\,+[1-2]$)/)
        .required()
        .error(() => 'The values are not right'),*/
    id_user_validation: Joi.number().required(),
    title_validation: Joi.string().required(),
    id_validation: Joi.number().required(),
    done_validation: Joi.boolean().required()
}

module.exports = constants;