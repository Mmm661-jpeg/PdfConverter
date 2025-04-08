import HeaderComp from "../components/headerComp"
import UploadBtnComp from "../components/uploadBtnComp"
import UploadComp from "../components/uploadComp"


function ConverterPage()
{
    return(
        <>
        <HeaderComp/>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] w-full gap-8 bg-gradient-to-br from-gray-400 to-gray-500">
            <UploadBtnComp/>
            <UploadComp/>
        </div>
        </>
    )
}

export default ConverterPage