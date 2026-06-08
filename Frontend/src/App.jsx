import {Routes,Route} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import DashBoard from "./Components/DashBoard";
function App(){
   return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
    </Routes>
    </>
   )
}
export default App;