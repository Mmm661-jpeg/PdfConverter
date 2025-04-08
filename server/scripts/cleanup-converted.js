const fs = require('fs');
const path = require('path');
const {poolPromise} = require('../configurations/db');
const mssql = require('mssql');

//for github actions later..

const deleteOldPdfs = async (daysToKeep = 7) =>
{
    try
    {
        const pool = await poolPromise(); //db connection

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() - daysToKeep); //1 week back from now / 1 weeek old

        const request = pool.request();

        const result = await request.input('expiry', mssql.DateTime, expiryDate)
        .query(`
        SELECT FileName 
        FROM FileModel 
        WHERE CreatedAt < @expiry 
        AND Success = 1
        `);

        //Success are converted ones we want to keep unsuccesfull ones
        const deletedFiles = [];

        for(const file of result.recordset)
        {
            const filePath = path.join(__dirname,"../converted",file.FileName)

            if(fs.existsSync(filePath))
            {
                fs.unlinkSync(filePath);

                deletedFiles.push(file.FileName);
            }
        }

        return { 
            deletedCount: deletedFiles.length,
            files: deletedFiles 
        };

    }

    catch(err)
    {
        console.error('Cleanup failed:', err);
        throw err;
    }
    


    
    
}

if(require.main === module)
{
    const days = parseInt(process.argv[2]) || 7;

    deleteOldPdfs(days).then(result=>{console.log(`Deleted ${result.deletedCount} files:`); console.log(result.files);})
    .catch(err=>{console.error(err);process.exit(1);});
}