const {UserMorph} = require('../database');

class UserMorphController {


    static async appendOrderToUser(req, res, next) {
        try {
            return res.send(await UserMorph.appendOrderToUser(req.body));
        } catch (e) {
            return res.status(400).send(e.message);
        }

    }


    static async deleteUserFromOrder(req, res, next) {
        try {
            return res.send(await UserMorph.removeUserFromOrder(req.body))
        } catch (e) {
            return res.status(400).send(e.message);

        }
    }

    static async appendProductToUser(req, res, next) {
        try {
            return res.send(await UserMorph.appendProductToUser(req.body));
        } catch (e) {
            return res.status(400).send(e.message);
        }
    }

    static async deleteProductFromUser(req, res, next) {
        try {
            return res.send(await UserMorph.removeUserFromProduct(req.body))
        } catch (e) {
            return res.status(400).send(e.message);

        }
    }


}

module.exports = UserMorphController;