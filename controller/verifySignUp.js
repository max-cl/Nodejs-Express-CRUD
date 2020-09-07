const config = require('../config/config');
const ROLEs = config.ROLEs; 


checkRolesExisted = (req, res, next) => {	
	if(!ROLEs.includes(req.body.roles.toUpperCase())){
		res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles);
		return;
	}
	next();
}

const signUpVerify = {};
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;