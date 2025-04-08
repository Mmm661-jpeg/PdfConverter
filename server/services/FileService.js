const fs = require("fs");
const path = require('path');
const puppeteer = require('puppeteer');
const libre = require('libreoffice-convert');

const { v4: uuidv4 } = require('uuid');


const repo = require("../repository/FileRepo");


const convertedDir = path.join(__dirname, '../converted'); //setup folder for converted
if (!fs.existsSync(convertedDir)) {
    fs.mkdirSync(convertedDir, { recursive: true });
}

const createConvertedFileName = (filename) =>
{
    const uniqueID = uuidv4();
    const nameWithoutExt = path.basename(filename, path.extname(filename)); // Remove extension

    const cleanFilename = nameWithoutExt.replace(/\s+/g, '_');

    return `${uniqueID}-${cleanFilename}.pdf`;

}


const handleFileConversion = async(file) =>
{
    try
    {
        let isConverted = false;

        const extension = path.extname(file.originalname).toLowerCase();

        const newFileName = createConvertedFileName(file.originalname);

        const convertedFilePath = path.join(convertedDir,newFileName)

        if(extension === '.html' || extension === '.txt') //puppeteer handles these
        {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const fileContent = fs.readFileSync(file.path, "utf8");
            await page.setContent(fileContent, { waitUntil: "load" });
            await page.pdf({ path: convertedFilePath, format: "A4" });
            await browser.close();
            isConverted = true;
        }

        else if([".docx", ".xlsx", ".pptx"].includes(extension) ) //libre handles these
        {
            const fileBuffer = fs.readFileSync(file.path);

            let pdfBuffer = await new Promise((res,rej)=>
            {
                libre.convert(fileBuffer,".pdf",undefined,(err,success)=>
                {
                    if(err)
                    {
                        rej(err);
                    }

                    else
                    {
                        res(success);
                    }
                });
            });

            fs.writeFileSync(convertedFilePath,pdfBuffer);
            isConverted = true
        }

        

        const fileModel = {//document every attempt not only success
            FileName: isConverted? path.basename(convertedFilePath) : path.basename(file.originalname), 
            FileType: extension, 
            FileSize: fs.statSync(file.path).size, 
            Success: isConverted ? 1 : 0 
        };

    

    

        const result = await repo.insertFile(fileModel);
       

        if (isConverted || result) { //Delete the file in uploads if  succcesfully converted
            fs.unlinkSync(file.path); //keep for future investigation if it fails. 
        }

        if (result <=0)
        {
            console.error(`Error: DB did not record conversion attempt!`);
        }
       

        return isConverted ? path.basename(convertedFilePath) : null; //only need name in front
       
    }
    catch(err)
    {
        console.error('Error during file conversion:', err);
        throw err;
    }
}

const getConvertedFile = async (filename) =>
{
    const filePath = path.join(__dirname, "../converted", filename); //file names not unique!

    if(fs.existsSync(filePath))
    {
        return filePath
    }
    else
    {
        return null;
    }
}

module.exports = {handleFileConversion, getConvertedFile} //exported to controller