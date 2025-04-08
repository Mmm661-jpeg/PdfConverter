
const {mssql,poolPromise} = require("../configurations/db");



const insertFile = async (filemodel) =>
{
    try
    {
        console.log("File Model: ", filemodel);
        //connecting to db
        const pool = await poolPromise();
        const request = pool.request(); //Like dynamicParam in C# dapper/ef

        //query params
        request.input('FileName', mssql.NVarChar(255), filemodel.FileName);
        request.input('FileType', mssql.NVarChar(50), filemodel.FileType);
        request.input('FileSize', mssql.Int, filemodel.FileSize);
        request.input('Success', mssql.Bit, filemodel.Success);
    


        //the query
        const result = await request.query(
           `INSERT INTO FileModel(FileName,FileType,FileSize,Success)
           VALUES(@FileName,@FileType,@FileSize,@Success);
           `
        );

        return result.rowsAffected
    }
    catch(err)
    {
        console.error('Error inserting file:', err);
        throw err;
    }
}

module.exports = {insertFile} //exported to service