import React, {useState,useContext, useEffect} from "react";
import axios from "axios";
import InstaContext from "../context/InstaContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [joke, setJoke] = useState("")
    const [name, setName] = useState("")
    const {token, setToken} = useContext(InstaContext)

    const navigate = useNavigate();


    useEffect(()=>{
         if(token == ""){
            let localStorageToken = localStorage.getItem("token")
            if(localStorageToken == ""){
                navigate("/login")
            }
            else{
                setToken(JSON.parse(localStorageToken))
            }
         }
    },[])
    

    useEffect(()=>{
        if(token != ""){
          getJoke()
        }
    },[token])

    async function getJoke(){
        try{
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
                    headers:{
                        "authorization": `Bearer ${token}`
                    }
                })

                console.log("success",response.data)
                console.log("joke",response.data.data.message)
                setJoke(response.data.data.message)
                setName(response.data.data.user.name)
        }
        catch(error){
            console.log("failure",error.response.data)
        }
    }

    async function logout(){
        try{
            const response =  await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                    headers:{
                        "authorization": `Bearer ${token}`
                    }
                })
                setToken("")
                setName("")
                setJoke("")
                // delete from Localstorage: 
                localStorage.removeItem("token")
                navigate("/login")
        }
        catch(error){
            console.log("failure",error.response.data)
        }


    }


    return(
        <div>
            <h1>Welcome {name}</h1>
            <p>{joke}</p>

            <button onClick={logout}>Logout</button>
            
        </div>
    )
}

export default Dashboard;

