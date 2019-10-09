const {Schema, Schema: {Types: {ObjectId}}} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['distributor', 'seller', 'customer']
    }
});


User.statics.createUser = async function (data) {
    const isExist = await this.findOne({
        email: data.email
    })
    if (isExist)
        throw new Error('User Already exists');

    const user = await this.create({
        ...data
    })
    return user;
}

User.statics.updateUser = async function (data) {

    const user = await this.findById(data._id);

    user.name = data.name;
    user.surname = data.surname;
    user.phoneNumber = data.phoneNumber;
    user.address = data.address;
    user.password = data.password;
    return user.save();


}


User.statics.deleteUser = async function(id){
    const user  = await this.findById(id);
    if(!user)
        throw new Error('User doesn\'t exist' );

    return user.delete();
}

module.exports = User;