const {Order} = require('../database');

class OrderController {


    static async index(req, res, next) {
        try {
            return res.send(await Order.getOrders());
        } catch (e) {
            res.status(400).send({message: e.message});
        }

    }


    static async create(req, res, next) {
        try {
            return res.send(await Order.createOrder(req.body));
        } catch (e) {
            res.status(400).send({message: e.message});
        }

    }

    static async update(req, res, next) {
        try {
            req.body.id = req.params.id;
            return res.send(await Order.updateOrder(req.body));
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }

    static async delete(req, res, next) {
        try {
            return res.send(await Order.deleteOrder(req.params.id));
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }


}

module.exports = OrderController;