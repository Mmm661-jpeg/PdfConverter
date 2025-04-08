

class FileModel //not used now but may be useful in reads/gets
{
    constructor(ID,FileName,FileType,FileSize,Success)
    {
        this.ID = ID,
        this.FileName = FileName
        this.FileType = FileType,
        this.FileSize = FileSize,
        this.Success = Success

    };
}

module.exports = FileModel; 