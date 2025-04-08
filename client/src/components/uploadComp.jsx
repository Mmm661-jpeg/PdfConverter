

import { useContext, useState,useEffect } from "react";
import { convertFileApiCall } from "../services/FilesService"

import PresentLinkComp from "./presentLinkComp";
import { uploadBtnContext } from "../context/uploadBtnContext/uploadBtnContext";

function UploadComp()
{
    const {btnClicked,setBtnClicked} = useContext(uploadBtnContext);

    const[theLink,setTheLink] = useState(null);
    const [failMessage,setFailMessage] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (theLink) {
            console.log("New link available:", theLink);
        }
    }, [theLink]);
    

    const handleFileChange = (e) =>
    {
        setSelectedFile(e.target.files[0]);
        setFailMessage(null);//reset failmessage when new file is chosen
    }


    const callUploadapi = async(file) =>
    {
        setTheLink(null); //reset link

        const result  = await convertFileApiCall(file);
        if(result)
        {
            setTheLink(result.filePath); //back sends obj with fielpath
        }
        else
        {
            setFailMessage("Pdf conversion failed, try again!")
        }

    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (!selectedFile) 
        {
            alert("Please select a file!");
            return;
        }

        await callUploadapi(selectedFile)

        setBtnClicked(false);
    }

    //Present comp should re render when a new file uploads

    //when call fails present link dissapears and above accepted 
    // files a red message apears


    return(

        <>
            <span>
                {theLink &&(<PresentLinkComp theLink={theLink} /> )}
            </span>

            {
                btnClicked &&(

                    <div className="bg-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-3xl flex flex-col gap-2 items-center text-center transition-transform duration-300 hover:scale-105">

                        {failMessage &&(
                            <p className="font-extrabold text-red-600">
                                {failMessage}

                            </p>)}

                        <p>
                            Accepted filetypes: html,txt,docx,xlsx,pptx
                        </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="fileUpload">Choose a file:</label>
                    <input

                        type="file"
                        id="fileUpload"
                        accept=".html,.txt,.docx,.xlsx,.pptx"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded p-2 shadow-lg hover:bg-blue-50 focus:ring focus:ring-blue-300 transition"
                        />

                    <button 
                    type="submit" disabled ={!selectedFile}
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-lg hover:bg-blue-600"
                    >
                        Upload
                    </button>

                    </form>

                    </div>

                   
                )
            }

    

        </>
    )
}

export default UploadComp