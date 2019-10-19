const {User} = require('../database');
const BigChain = require('../services/BigChain');
class UserController {


    static async create(req, res, next) {

        try {
            // const bigChain
            req.body.bigChainId = BigChain.generateKey();
            const user = await User.createUser(req.body);
            return res.send(user);
        } catch (e) {
            console.log(e);
            console.log(e.message);
            return res.status(e.status || 400).send({message: e.message});
        }
    }

    static async update(req, res, next) {
        try {
            req.body._id = req.params.id;
            const user = await User.updateUser(req.body);
            return res.send(user);
        } catch (e) {
            return res.status(e.status || 400).send({message: e.message});
        }
    }

    static async delete(req, res, next) {
        try {
            return res.send(await User.deleteUser(req.params.id));
        } catch (e) {
            return res.status(e.status || 400).send({message: e.message});
        }
    }


}

module.exports = UserController;