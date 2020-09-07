const middlewareValidator = require('../validator/middleware.validator');
const schemas = require('../validator/schemas/product.schema');

module.exports = function(app) {

    const productController = require('../controller/product.controller');
    
    app.get('/api/get_product/:id_user', middlewareValidator.middlewareValidatorParams(schemas.get_product, 'params'), productController.getProduct);
    app.post('/api/create_product/', middlewareValidator.middlewareValidatorBody(schemas.create_product, 'body'), productController.createProduct);
    app.put('/api/update_product/', middlewareValidator.middlewareValidatorBody(schemas.update_product, 'body'), productController.updateProduct);
    app.delete('/api/delete_product/:id_user/:id_product', middlewareValidator.middlewareValidatorParams(schemas.delete_product, 'params'), productController.deleteProduct);

}