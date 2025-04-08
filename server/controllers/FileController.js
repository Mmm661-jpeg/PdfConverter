
require('dotenv').config();
const fileService = require('../services/FileService');

const host = process.env.HOST || "localhost";
const protocol = process.env.PROTOCOL || "http";
const port = process.env.PORT || 5000;

const theAdress = `${protocol}://${host}:${port}`;

//exports to routes which uses the "method" 

const convertfile = async (req,res) =>
{
    try
    {
        if(!req.file)
        {
            return res.status(400).send("No file uploaded");
        }

        const convertedFileName =  await fileService.handleFileConversion(req.file);

        const publicUrl = `${theAdress}/files/download/${convertedFileName}` //build route for returnused for download

        if(convertedFileName) //either null or a converted file
        {
            res.status(200).send(
                {
                    message: "File converted successfully!",
                    filePath: `${publicUrl}`
                }
            );
        }
        else
        {
            res.status(400).send(
            {
                message: "File conversion unsuccesfull",
                filePath: null
            });
        } 
      
    }
    catch (err) {
        console.error('Error in file conversion:', err);
        res.status(500).send('Error converting file');
    }
}

const downloadFile = async (req,res) =>
{
    try
    {
        const filename = req.params.filename;
   
        if(!filename)
        {
            return res.status(400).send("No filename given!");
        }

        const filePathfromService = await fileService.getConvertedFile(filename)

        if(filePathfromService)
        {
            res.download(filePathfromService,filename,(err)=>
            {
                if(err)
                {
                    console.error("Error sending file:", err);
                    if(!res.headersSent)
                    {
                        res.status(500).send("Error downloading file");
                    }

                }
              
            })
        }
        else
        {
            return res.status(404).send("File not found");
        }

    }
    catch(err)
    {
        console.error("Error in downloadFile:", error);
        res.status(500).send("Internal server error");
    }

}

module.exports = {convertfile,downloadFile}