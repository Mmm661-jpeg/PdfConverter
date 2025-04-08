const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileController = require('../controllers/FileController');

//we first make sure uploads folder exists if it doesent we make one with standardized path

const uploadDir = path.join(__dirname,"../uploads"); //step out of router dir attempt to enter upload

if(!fs.existsSync(uploadDir))
{
    fs.mkdirSync(uploadDir,{recursive:true})
}


const storage = multer.diskStorage( //saves file first in uploads
    {
        destination:(req,file,cb) =>
        {
            cb(null,uploadDir) 
        },

        filename: (req,file,cb) =>
        {
            cb(null,Date.now() + path.extname(file.originalname)) //date then ext like .TXT
        },
    }
);

const upload = multer(
    {
        storage: storage
    }
);

router.post("/convert",upload.single("file"),fileController.convertfile); //takes file to controller and also saves it 

router.get("/download/:filename", fileController.downloadFile)

module.exports = router //exported to index.js