import {useState} from "react";
import "./App.css"
import Header from "./Components/Header/header";
import {Route,Routes,Navigate} from "react-router-dom";
import Home from "./Pages/Home/home";
import Footer from "./Components/Footer/footer";
import Login from "./Pages/Login/login";
import Stock from "./Pages/Stock/stock";
import AdminDashboard from "./Pages/Admin/Dashboard/adminDashboard";
import RegisterStudent from "./Pages/Admin/RegisterStudent/registerStudent";
import Managemedicine from "./Pages/Admin/ManageMedicine/managemedicine";
import Record from "./Pages/Admin/Record/record";
import Facility from "./Pages/Admin/Facility/facility";
import NearByHospital from "./Pages/Admin/NearByHospital/nearByHospital";
import Gallery from "./Pages/Admin/Gallery/gallery";
import Studentdashboard from "./Pages/Student/studentdashboard";
import GlobalLoader from "./Components/GlobalLoader/globalLoader";
function App(){
  const[loader,setLoader]=useState(false);
  const[isLogin,setIsLogin]=useState(localStorage.getItem("isLogin"));

  let role = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).role : null;
  let id = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo"))._id : null;

  const handleLogin=(value)=>{
    setIsLogin(value);
  }
  const showLoader=()=>{
    setLoader(true);
  }
  const hideLoader=()=>{
    setLoader(false);
  }

  return(
    <div className="App">
      <Header isLogin={isLogin} showLoader={showLoader} hideLoader={hideLoader} handleLogin={handleLogin}>
      </Header>
      <Routes>
        <Route path="/" element={<Home showLoader={showLoader} hideLoader={hideLoader} ></Home>}></Route>
        <Route path="/login" element={isLogin ? role === "student" ? <Navigate to={`/student/${id}`} /> : <Navigate to={'/admin/dashboard'} /> :<Login handleLogin={handleLogin} showLoader={showLoader} hideLoader={hideLoader}/>}></Route>  
        <Route path="/stock" element={<Stock showLoader={showLoader} hideLoader={hideLoader}/>}></Route>
        <Route path="/admin/dashboard" element={isLogin && role!=="student" ?<AdminDashboard showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}></Route>
        <Route path="/admin/register-student" element={isLogin && role!=="student" ?<RegisterStudent showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}></Route>
        <Route path="/admin/manage-medicine" element={isLogin && role!=="student" ?<Managemedicine showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}></Route>
        <Route path="/admin/record" element={isLogin && role !== "student" ? <Record showLoader={showLoader} hideLoader={hideLoader} /> : <Navigate to="/" />} />

        <Route path="/admin/facility" element={isLogin && role !== "student" ? <Facility showLoader={showLoader} hideLoader={hideLoader} /> : <Navigate to="/" />} />
        <Route path="/admin/nearByHospital" element={isLogin && role !== "student" ? <NearByHospital showLoader={showLoader} hideLoader={hideLoader} /> : <Navigate to="/" />} />
        <Route path="/admin/gallery" element={isLogin && role !== "student" ? <Gallery showLoader={showLoader} hideLoader={hideLoader} /> : <Navigate to="/" />} />
        <Route path="/student/:id" element={isLogin && role === "student" ? <Studentdashboard showLoader={showLoader} hideLoader={hideLoader} /> : <Navigate to="/" />} />


      </Routes>
      <Footer></Footer>
      {loader && <GlobalLoader/>}
    </div>
  )
}
export default App
