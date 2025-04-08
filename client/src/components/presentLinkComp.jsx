


function PresentLinkComp({theLink})
{
   
    return(
        <>
        {theLink &&(

            <a 
            href={theLink} 
            download 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-lg hover:bg-blue-600"
            >
            Download PDF
            </a>

        )}
        </>
    )
}

export default PresentLinkComp