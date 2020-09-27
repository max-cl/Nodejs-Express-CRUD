const Joi = require('joi');

exports.middlewareValidatorBody = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = Joi.validate(req.body, schema); 
    const valid = error == null; 

    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');

      console.log("error", message); 
      res.status(422).send(message);
    } 
  } 
}

exports.middlewareValidatorParams = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = Joi.validate(req.params, schema); 
    const valid = error == null; 

    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');

      console.log("error", message); 
      res.status(422).send(message);
    } 
  } 
}