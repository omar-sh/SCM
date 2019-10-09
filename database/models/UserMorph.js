const {Schema} = require('mongoose');
/**
 * it's like a pivot table between user table and (product & orders)
 * @type {*|Mongoose.Schema}
 */
const UserMorph = new Schema({

    user: {type: Schema.Types.ObjectId, ref: 'User'},
    model: {type: Schema.Types.ObjectId, refPath: 'onModel'},
    onModel: {
        type: String,
        required: true,
        enum: ['Product', 'Order']
    }


})

UserMorph.statics.appendOrderToUser = async function (data) {
    data.onModel = 'Order'
    const distributor = await this.model('User').findById(data.user);

    if (distributor.type !== 'distributor')
        throw new Error('Invalid User Type');
    return await this.create({
        ...data
    })
};


UserMorph.statics.removeUserFromOrder = async function (data) {
    console.log(data.user , data.order);
   const obj = await this.findOne({
        user:data.user,
        model:data.order,
       onModel:'Order'
    });
   return await obj.delete();
};

UserMorph.statics.appendProductToUser = async function(data){
    data.onModel = 'Product'
    const customer = await this.model('User').findById(data.user);

    if (customer.type !== 'customer')
        throw new Error('Invalid User Type');
    return await this.create({
        ...data
    })
}


UserMorph.statics.removeUserFromProduct = async function (data) {
    console.log(data.user , data.product);
    const obj = await this.findOne({
        user:data.user,
        model:data.product,
        onModel:'Product'
    });
    return await obj.delete();
};


module.exports = UserMorph;