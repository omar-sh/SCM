const {User, Order} = require('../database')
const BigChain = require('../services/BigChain')

class BigChainOrderController {

    static async createOrder(req, res, next) {
        try {
            const userKey = (await User.findById(req.body.user)).bigChainId;
            const bigChain = new BigChain(userKey);

            const order = new Order({
                ...req.body
            });

            const err = await order.validate();

            if (err)
                return res.send(err);

            else {
                const x = (await bigChain.create(order.toJSON()));
                console.log('XX', x);
                return res.send(x);
            }
        } catch (e) {
            return res.send(e.message)
        }
    }

    static async index(req, res, next) {
        let objs = [];
        const user = await User.findById(req.params.id);
        const order = new BigChain(user.bigChainId);
        return res.send(await order.getDocs());


    }
}

module.exports = BigChainOrderController;