const mongoose  = require('mongoose')
const { Schema } = mongoose;

const AdminSchema =  new Schema({
    username:String,
    password:String,
    email:String,
    profile:String,
    coverPhoto:String ,
    description:String ,
    channelId:String

})

module.exports = mongoose.model('Admin' , AdminSchema)
