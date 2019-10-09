const userSchema = require('./models/User');
const productSchema = require('./models/Product');
const orderSchema = require('./models/Order');
const userMorphSchema = require('./models/UserMorph');
const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose');

const schemas = {
    userSchema,
    productSchema,
    orderSchema,
    userMorphSchema
};

Object.keys(schemas).forEach((key) => {
    const schema = schemas[key];
    schema.set('toJSON', {
        virtuals: true,
        getters: true
    });

    schema.set('toObject', {
        virtuals: true,
        getters: true
    });

    if (schema.get('timestamps') === undefined) {
        schema.set('timestamps', true);
    }
    schema.plugin(mongoosePaginate);

});


module.exports = {
    User: mongoose.model('User', userSchema),
    Product: mongoose.model('Product', productSchema),
    Order: mongoose.model('Order', orderSchema),
    UserMorph: mongoose.model('UserMorph', userMorphSchema)
};