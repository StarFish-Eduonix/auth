import React,{useState, useContext} from "react"; 
import axios from "axios";
import InstaContext from "../context/InstaContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    
    const [user, setUser] = useState({name:"",email:"",password:"",cpassword:""});
    const {setToken} = useContext(InstaContext);

    const navigate = useNavigate();


    function updateUser(e){
        // console.log("key",e.target.name, "value",e.target.value);
        setUser({...user, [e.target.name]: e.target.value});
    }


    async function implementSubmit(e){
        e.preventDefault()
          if(!user.name || !user.email || !user.password || !user.cpassword){
            alert("Please fill all the fields")
            return
          }
          if(user.password !== user.cpassword){
            alert("Password and Confirm Password should be same")
            return
          }


        try{
            const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
                name:user.name,
                email:user.email,
                password:user.password,
            })
            console.log("success",response.data)
            setToken(response.data.data.token)
            // add to Localstorage:
            let json_token = JSON.stringify(response.data.data.token)
            localStorage.setItem("token",json_token)

            alert("Signup Successful")
            navigate("/dashboard")
        }

        catch(error){
            console.log("failure",error.response.data)
        }
    }

    


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={implementSubmit}>
                <input type="text" placeholder="Name"  name="name"
                onChange={updateUser} 
                 
                />
                <br />
                <input type="email" placeholder="Email"  name="email"
                onChange={updateUser}
                />
                <br />
                <input type="password" placeholder="Password"  name="password"
                onChange={updateUser}
                />
                <br />
                <input type="password" placeholder="Confirm Password"  name="cpassword"
                onChange={updateUser}
                />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;