import {useState} from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
function Register(){
   const navigate=useNavigate();
   const [name,setname]=useState("");
   const [password,setpassword]=useState("");
   const [email,setemail]=useState("");
   const nameChange=(e)=>{
      setname((name)=>e.target.value);
   }
   const passwordChange=(e)=>{
      setpassword((password)=>e.target.value);
   }
   const emailChange=(e)=>{
      setemail((email)=>e.target.value);
   }
   const goToDashBoard=async()=>{
       try{
          const result=await axios.post("http://localhost:5000/auth/register",{name,email,password},{ withCredentials:true});
          navigate("/dashboard");
       }catch(error){
         console.log(error);
         alert(error);
       }
   }
   return(
    <>
    <header>
    <h1>Register Page</h1>
    </header>
    <main>
      <section>
    <form onSubmit={goToDashBoard}>
      <input type="text" onChange={nameChange} placeholder="Give name"/>
      <input type="text" onChange={emailChange} placeholder="Give email"/>
      <input type="text" onChange={passwordChange} placeholder="Give password"/>
      <button type="submit" >Submit</button>
    </form>
    </section>
    </main>
    <footer>
      <h6>If already have account, login</h6>
      <Link to="/login">Login</Link>
    </footer>
    </>
   )
}
export default Register;