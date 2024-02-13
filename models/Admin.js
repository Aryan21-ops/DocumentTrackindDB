const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    Adminid:{
        type:Number
    },
    adminname : {
        type : String
    },
    password:{
        type : String
    },
    email: {
        type : String
    }

}, {timestamps: true})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin