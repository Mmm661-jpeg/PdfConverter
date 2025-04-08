import { useState } from "react";
import { uploadBtnContext } from "./uploadBtnContext";


const UploadBtnProvider = ({children}) =>
{
    const [btnClicked,setBtnClicked] = useState(false);

    return(
        <uploadBtnContext.Provider value={{ btnClicked, setBtnClicked }}>
            {children}
        </uploadBtnContext.Provider>
    )
}

export default UploadBtnProvider