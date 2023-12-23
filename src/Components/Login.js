import React,{useState, useContext} from "react"; 
import axios from "axios";
import InstaContext from "../context/InstaContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const [user, setUser] = useState({email:"",password:""});
    const {setToken} = useContext(InstaContext);

    const navigate = useNavigate();


    function updateUser(e){
        // console.log("key",e.target.name, "value",e.target.value);
        setUser({...user, [e.target.name]: e.target.value});
    }


    async function implementSubmit(e){
        e.preventDefault()

         if(!user.email || !user.password){
            alert("Please fill all the fields")
            return
         }

        try{
            const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/login",{
                email:user.email,
                password:user.password,
            })
            console.log("success",response.data)
           
            setToken(response.data.data.token)
            // add to Localstorage:
            let json_token = JSON.stringify(response.data.data.token)
            localStorage.setItem("token",json_token)

            alert("Login Successful")
            navigate("/dashboard")
        }

        catch(error){
            console.log("failure",error.response.data)
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={implementSubmit}>
                
                <br />
                <input type="email" placeholder="Email"  name="email"
                onChange={updateUser}
                />
                <br />
                <input type="password" placeholder="Password"  name="password"
                onChange={updateUser}
                />
                
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;