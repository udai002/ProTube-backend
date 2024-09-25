const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req , file , cd){
        cd(null , './public')
    },
    filename:function(req , file , cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null , file.originalname+"-"+uniqueSuffix)
    }
})

const upload = multer({storage})

module.exports = upload