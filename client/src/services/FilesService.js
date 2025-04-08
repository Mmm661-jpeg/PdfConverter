const baseUrl = 'http://localhost:5000/files'

import { apiCall } from "../utils/apiCallUtils"


export const convertFileApiCall = async (file) =>
{
    if(!file)
    {
        console.error("convertFileApiCall: File cant be null");
        return null;
    }

    const url = `${baseUrl}/${'convert'}`

    const formData = new FormData();
    formData.append("file", file);

    const result = await apiCall(url,'POST',formData,false,true);

    return result //return link
}

export const downloadFileApiCall = async(filename) =>
{
    if(!filename)
    {
        console.error("downloadFileApiCall:filename required!");
        return null;
    }

    const url = `${baseUrl}/${'download'}/${filename}`

    const result = await apiCall(url,'GET');

    return result;


}