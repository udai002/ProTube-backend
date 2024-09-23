const express = require('express')
const Admin = require('../models/Admin')
const router = express.Router()
const jwt  = require('jsonwebtoken')
const { v4: uuidv4 } = require("uuid");
const upload = require('../middleware/multer.middleware')

const uploadFile = upload.fields([{name:"profile"} , {name:"coverPhoto"}])

router.post('/api/user' ,uploadFile ,  async (req , res)=>{
    const {username , password , email  , description } = req.body
    console.log(req.files)

    const profile = req.files['profile'][0].path
    const coverPhoto = req.files['coverPhoto'][0].path
    console.log(profile)
    console.log(coverPhoto)
    
    if(username && password && email ){
        const checkUser = await Admin.find({email})
        console.log(checkUser)
        if(checkUser.length !== 0){
            return res.status(401).send({msg:"user already exists"})
        }
        const channelId = uuidv4();
        Admin.create({username , password , email , profile , description , coverPhoto , channelId}).then(()=>{
            jwt.sign({username , channelId} , "SECRETE" , (err,token)=>{
                res.send({jwtToken:token})
            })
        }).catch(e=>{
            res.status(500).send({msg:"Internal server error"})
        })
    }
})

router.get("/api/user" , async (req , res)=>{
    const data = await Admin.find();
    console.log()
    res.send({users:data})
})

router.post("/api/user/login" , async(req , res)=>{
   const {email , password} = req.body 
   try{
    const findUser = await Admin.findOne({email})
    console.log(findUser)
    if(findUser){
     if(password === findUser.password){
         const {username , channelId} = findUser
         jwt.sign({username , channelId} , "SECRETE" ,(err , token)=>{
            return res.send({jwtToken:token})
         }) 
     }
    }
   }catch(e){
    res.status(404).send({msg:"Not Found" , e})
   }
   

})



module.exports = router