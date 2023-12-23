import React,{useState} from "react";
import InstaContext from "./InstaContext";


const InstaProvider=(props)=>{
    const [token, setToken] = useState("")

    return(
        <InstaContext.Provider value={{
            token:token,
            setToken:setToken
        
        }}>

            {props.children}

        </InstaContext.Provider>
    )
}

export default InstaProvider;