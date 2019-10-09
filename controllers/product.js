const {Product} = require('../database');

class ProductController {


    static async index(req, res, next) {
        try {
            return res.send(await Product.getProducts());
        } catch (e) {
            res.status(400).send({message: e.message});
        }

    }


    static async create(req, res, next) {
        try {
            return res.send(await Product.createProduct(req.body));
        } catch (e) {
            res.status(400).send({message: e.message});
        }

    }

    static async update(req, res, next) {
        try {
            req.body.id = req.params.id;
            return res.send(await Product.updateProduct(req.body));
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    static async delete(req, res, next) {
        try {
            return res.send(await Product.deleteProduct(req.params.id));
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }


}

module.exports = ProductController;