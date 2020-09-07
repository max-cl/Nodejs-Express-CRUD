const verifySignUp = require('../controller/verifySignUp');
const middlewareValidator = require('../validator/middleware.validator');
const schemas = require('../validator/schemas/user.schema');

module.exports = function(app) {

    const userController = require('../controller/user.controller');
 
    /** MANAGEMENT USERS */
    app.post('/api/auth/signup', middlewareValidator.middlewareValidatorBody(schemas.signup, 'body'), [verifySignUp.checkRolesExisted], userController.signup);
    app.post('/api/auth/signin', middlewareValidator.middlewareValidatorBody(schemas.signin, 'body'), userController.signin);
    app.get('/api/auth/loaduser', userController.loaduser);
    app.post('/api/auth/forgotpassword', middlewareValidator.middlewareValidatorBody(schemas.forgotpassword, 'body'), userController.forgotpassword);
    app.get('/api/auth/resetpassword/:resetpasswordtoken', userController.resetpassword);
    app.put('/api/auth/updatepasswordviaemail', middlewareValidator.middlewareValidatorBody(schemas.updatepasswordviaemail, 'params'), userController.updatepasswordviaemail);
    	
}