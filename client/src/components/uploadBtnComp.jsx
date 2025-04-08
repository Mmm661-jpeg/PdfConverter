import { useContext } from "react"

import { uploadBtnContext } from "../context/uploadBtnContext/uploadBtnContext"


function UploadBtnComp()
{
    const {btnClicked,setBtnClicked} = useContext(uploadBtnContext);

    const handleClick = () =>
    {
        setBtnClicked(prev =>!prev);
    }

    return(
        <>
        <button 
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-lg hover:bg-blue-600"
        onClick={handleClick}
        >

            {btnClicked ? "Cancel": "Upload"}

        </button>
        </>
    )
}

export default UploadBtnComp