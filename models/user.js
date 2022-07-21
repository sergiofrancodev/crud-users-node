const { Schema, model} = require('mongoose');


const UsersSchema = Schema({
    username:{
        type: String,
        required: [true, 'name is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});



UsersSchema.methods.toJSON = function(){

    const { __v, password, ...user } = this.toObject();
    return user;

}

module.exports = model('User', UsersSchema);
