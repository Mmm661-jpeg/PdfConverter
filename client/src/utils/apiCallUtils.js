

export const apiCall = async (endpoint,method,body=null,auth=false,upload = false) =>
{

    const headers = {"Accept":"application/json"}
    
    if(auth) //if httpCookieonly it handles auth automaticly can rmeove auth
    {
        const token = getCookie("token"); 

        if(token)
        {
            headers["Authorization"] = `Bearer ${token}`
        }
    }

    let bodyContent = null;

    if(upload && body)
    {
    bodyContent = body;
    }

    if(body && !upload)
    {
        headers["Content-Type"] = "application/json"
        bodyContent = JSON.stringify(body)
    }

    try
    {
        
        const response = await fetch(endpoint, 
            {
                method:method,
                headers: upload ? {} : headers,
                body: bodyContent,
                //if httponlycookie credentials: "include"
            }
        );

        if(!response.ok)
        {
            const errorMessage = await response.text();
            console.error(`HTTP error: ${response.status}: ${errorMessage}`);
            return null;
        }
        else
        {
            return await response.json();
        }
    }
    catch(err)
    {
        console.error(`Network error before making api call: ${err.message}`);
        return null;
    }
}