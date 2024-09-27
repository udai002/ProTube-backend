const express = require('express')
const { default: mongoose } = require('mongoose')
const router = require('./routes/User')
const cors = require('cors')
const dotenv = require('dotenv').config() 
// const mongoose = require('mongoose')
const Port = dotenv.parsed.PORT || 3000
app = express()

//connecting to mongodb altas using mongoose
mongoose.set("strictQuery" , false)
const connectMongo = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://karumuriudaisai002:udai123@cluster0.4o0q2x6.mongodb.net/')
    }catch(e){
        console.log(e)
    }
}

connectMongo()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/' , (req , res)=>{
    res.send({message:"Welcome to express app"})
})

app.use('/' , router)

app.listen(Port , ()=>{
    console.log(`app is listening... at http://localhost:${Port}`)
})

module.exports = app
