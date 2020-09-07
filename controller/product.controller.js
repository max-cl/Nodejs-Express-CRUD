const passport = require('passport');

//Models
const db = require('../config/db.config');
const Product = db.product;

//Helpers
const helper = require('../helper');


exports.getProduct = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                const { id_user } = req.params;
                const products = await Product.findAll();
                
                if (products.length > 0) {
                    const data = helper.Helper_1(products);
                    console.log('DATA: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is not products for this user');
                    res.status(404).send('There is not products for this user');
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


exports.createProduct = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {

                const { id_user, name_product } = req.body;
                const newProduct = await Product.create({ name_product: name_product, id_user: id_user });
                console.log('DATA: ', newProduct.dataValues);
                res.status(200).json(newProduct);

            } catch (e) {
                console.error(e);
            }   
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};


exports.updateProduct = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                
                const { name_product, id_product } = req.body;
                const updatedProduct = await Product.update({ name_product: name_product }, {
                    where: {
                        id_product: id_product
                    }
                });
                
                if(updatedProduct[0] === 1){
                    console.log('Product updated.',);
                    res.status(200).json({ message: 'Product updated.' });
                } else {
                    console.log('The product doesn\'t exist.');
                    res.status(200).json({ message: 'The product ID: '+id_product+' doesn\'t exist.' });
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



exports.deleteProduct = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                const { id_product } = req.params;
                const deletedProduct = await Product.destroy({
                    where: {
                        id_product: id_product
                    }
                });

 
                if(deletedProduct === 1){
                    console.log('Product deleted.',);
                    res.status(200).json({ message: 'Product deleted.' });
                } else {
                    console.log('The product doesn\'t exist.');
                    res.status(200).json({ message: 'The product ID: '+id_product+' doesn\'t exist.' });
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