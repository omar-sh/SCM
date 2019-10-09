const {Schema, Schema: {Types: {ObjectId}}} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Product = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    expiredDate: {
        type: Date,
        required: true
    },
    dateManf: {
        type: Date,
        required: true
    },
    dateLogged: {
        type: Date,
        required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}


});


Product.statics.getProducts = async function () {


    return await this.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: {
                path: '$user',
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
                as: 'customers'
            }
        },
    ])


    return await this.find().populate('user');
}

Product.statics.createProduct = async function (data) {

    const user = await this.model('User').findById(data.user);

    if (!user && (user.type !== 'seller' || user.type !== 'distributor'))
        throw new Error('Invalid user type');

    const product = await this.create({
        ...data
    });
    return product;
};

Product.statics.updateProduct = async function (data) {
    const user = await this.model('User').findById(data.user);
    if (!user && (user.type !== 'seller' || user.type !== 'distributor'))
        throw new Error('Invalid user type');

    const product = await this.findById(data.id);
    if (!product)
        throw new Error('product not found');

    await product.updateOne({
        ...data
    });
    return product;

}


Product.statics.deleteProduct = async function (id) {
    const product = await this.findById(id);
    if (!product)
        throw new Error('Product not found');
    return await product.delete()
}

module.exports = Product;