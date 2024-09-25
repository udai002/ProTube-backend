const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req , file , cd){
        cd(null , './public')
    },
    filename:function(req , file , cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null ,uniqueSuffix+"-"+file.originalname)
    }
})

const upload = multer({storage})

module.exports = upload