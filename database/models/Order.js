const {Schema, Schema: {Types: {ObjectId}}} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Order = new Schema({

    dateShipped: {
        type: String,
        required: true
    },
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    customer: {type: Schema.Types.ObjectId, ref: 'User'},
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    status: {
        type: String,
        required: true
    },
    QR: {
        type: String,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    isOnTransit: {
        type: Boolean,
        required: true
    },
    dateOfArrival: {
        type: Date,
        required: true
    },


});


Order.statics.getOrders = async function () {
    return await this.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'seller',
                foreignField: '_id',
                as: 'seller'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'customer',
                foreignField: '_id',
                as: 'customer'
            }
        },


        {
            $unwind: {
                path: '$customer',
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            $unwind: {
                path: '$seller',
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            $lookup: {
                from: 'usermorphs',
                localField: '_id',
                foreignField: 'model',
                as: 'usermorphs'
            }
        },

        {
            $lookup: {
                from: 'users',
                localField: 'usermorphs.user',
                foreignField: '_id',
                as: 'distributors'
            }
        },
    ])

    // return this.find().populate('seller').populate('customer')

}

Order.statics.createOrder = async function (data) {
    const seller = await this.model('User').findById(data.seller);
    const customer = await this.model('User').findById(data.customer);

    if (seller.type !== 'seller' || customer.type !== 'customer')
        throw new Error('Invalid user type');
    return await this.create({
        ...data
    });
}

Order.statics.updateOrder = async function (data) {
    const seller = await this.model('User').findById(data.seller);
    const customer = await this.model('User').findById(data.customer);

    if (seller.type !== 'seller' || customer.type !== 'customer')
        throw new Error('Invalid user type');

    const order = await this.findById(data.id);
    return await order.update({
        ...data
    })

}

Order.statics.deleteOrder = async function (id) {
    const order = await this.findById(id);

    return await order.delete();

}

module.exports = Order;