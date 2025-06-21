import React,{useState} from 'react'
import "./home.css";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CollectionsIcon from '@mui/icons-material/Collections';
import AboutUs from "../../Components/AboutUs/aboutUs"
import Staff from '../../Components/Staffs/staff';
import Facilities from '../../Components/Facilities/facilities';
import NearByHospital from '../../Components/NearByHospitals/nearByHospital';
import Gallery from '../../Components/Gallery/gallery';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
const Home = (props) => {
    const[page,setPage]= useState("About");
    let[rightSideHeader,setRightSideHeader]=useState("About us");
    let userInfo=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;
    
    const handleChangeTab=(pagename)=>{
        setPage(pagename);
        switch(pagename){
            case "About":
                setRightSideHeader("About us");
                break;
            case "Staff":
                setRightSideHeader("Our Staffs");
                break;
            case "Facilities":
                setRightSideHeader("Facilities");
                break;
            case "NearByHospitals":
                setRightSideHeader("Near By Hospitals");
                break;
            case "Gallery":
                setRightSideHeader("Gallery");
                break;
        }
    }

    const getComponent=()=>{
        switch(page){
           
            case "About":
                return <AboutUs/>
            case "Staff":
                return <Staff showLoader={props.showLoader} hideLoader={props.hideLoader}/>
            case "Facilities":
                return <Facilities showLoader={props.showLoader} hideLoader={props.hideLoader}/>
            case "NearByHospitals":
                return <NearByHospital showLoader={props.showLoader} hideLoader={props.hideLoader}/>
            case  "Gallery":
                return <Gallery showLoader={props.showLoader} hideLoader={props.hideLoader}></Gallery>
            default:
                return null;
        }
        
    }
  return (
    <div className="home">
      <div className="home-block">
        <div className="home-page-left">
            {
                userInfo?.role==="admin" && <Link to={"/admin/dashboard"} className={'home-left-option'}>
                    <DashboardIcon/> Dashboard
                </Link>
            }
            {
                userInfo?.role==="student" && <Link to={`/student/${userInfo?._id}`} className={'home-left-option'}>
                    <DashboardIcon/> Profile
                </Link>
            }
            

            

            <div className={`home-left-option ${page==="About"?"active-opt":null}`} onClick={()=>{handleChangeTab("About")}}>
            <HomeIcon></HomeIcon>
            About us
            </div>

            <div className={`home-left-option ${page==="Staff"?"active-opt":null}`} onClick={()=>{handleChangeTab("Staff")}}>
            <PeopleAltIcon></PeopleAltIcon> 
            Staffs
            </div>

            <div className={`home-left-option ${page==="Facilities"?"active-opt":null}`} onClick={()=>{handleChangeTab("Facilities")}}>
            <Diversity3Icon></Diversity3Icon> 
            Facilities
            </div>

            
            <div className={`home-left-option ${page==="NearByHospitals"?"active-opt":null} `} onClick={()=>{handleChangeTab("NearByHospitals")}}>
            <LocalHospitalIcon></LocalHospitalIcon>
            Nearby Hospitals
            </div>

            <div className={`home-left-option ${page==="Gallery"?"active-opt":null}`} onClick={()=>{handleChangeTab("Gallery")}}>
            <CollectionsIcon></CollectionsIcon>
            Gallery
            </div>
        </div>
        <div className="home-page-right">
            <div className="home-right-header">
                {rightSideHeader}
            </div>
            <div className='home-right-section'>
                {getComponent()}
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Home
