import React,{useState,useEffect} from 'react'
import "./header.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import image6 from "../../Images/image6.jpg";
import "./header.css"
import axios from 'axios';
import {useLocation,Link,useNavigate} from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';

const Header = (props) => {
    const location=useLocation();
    const navigate=useNavigate();
    const[eventpopup,setEventpopup]=useState(false);
    const[helpline,setHelpline]=useState(false);
    const[events,setEvents]=useState([]);
    const handleOpenPopup=(popup)=>{
        if(popup==="event"){
            setEventpopup(true);
        }else{
            setHelpline(true);
        }

    }
    const fetchEvents=async()=>{
        await axios.get("http://localhost:4000/api/notification/get").then(response=>{
            console.log(response)
            setEvents(response.data.notifications); 
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if(eventpopup){
            fetchEvents()
        }
        
    },[eventpopup])
    const handleClosePopup=(popup)=>{
        if(popup==="event"){
            setEventpopup(false);
        }else{
            setHelpline(false);
        }

    }
    const handleLogin=function(){
        navigate("/login")
    }
    const handleLogout=async()=>{
        props.showLoader();
        await axios.post("http://localhost:4000/api/auth/logout",{},{withCredentials:true}).then(response=>{
            console.log(response);
            props.handleLogin(false);
            localStorage.clear();
            navigate("/");
        }).catch(err=>{
            console.log(err)
            toast.error(err?.response?.data?.error)
        }).finally(()=>{
            props.hideLoader();
        })
    }
  return (
    <div className="header">
      <div className="header-college-details">
        <div className="header-college-details-left">
            <img  className="header-college-details-left-logo" src={image2} alt="" />
            <div>
                <div className="header-college-details-name">राष्ट्रीय प्रौद्योगिकी संस्थान,</div>
                <div className="header-college-details-place">कॉलेज </div>
                <div className="header-college-details-name">XYZ College Of Technology</div>
                <div className="header-college-details-place">Delhi</div>
            </div>
        </div>

        <div className="header-college-details-right">
            <div className="header-college-social-media">
                <a target="_blank" href="https://youtu.be/bWoVqHpxzho?si=q-pHslgMjGZXETPO"><img src={image1} alt="" className="header-social-media-image"/></a>
                <a target="_blank" href="https://www.instagram.com/nitrourkela1961?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="> <img src={image3} alt="" className="header-social-media-image" /></a>
                <a target="_blank" href="https://x.com/nitrourkela"> <img src={image4} alt="" className="header-social-media-image"/></a>
                <a target="_blank" href="https://www.facebook.com/@nitrkl1/"><img src={image5} alt="" className="header-social-media-image" /></a>
            </div>
            <input type="text" className="header-input-tags" />
        </div>


      </div>

      <div className="navbar">
        <Link to={"/"} className={`navbar-links ${location.pathname==="/"?"active-link":null}`}>
            Home  
        </Link>
        <div onClick={props.isLogin?handleLogout:handleLogin} className={`navbar-links ${location.pathname==="/login"?"active-link":null}`}>
            {props.isLogin?"Logout":"Login"}  
        </div>
        <Link to={"/stock"} className={`navbar-links ${location.pathname==="/stock"?"active-link":null}`}>
            Stock View
        </Link>
        <div className="navbar-links event-link" onMouseEnter={()=>{handleOpenPopup("event")}} onMouseLeave={()=>{handleClosePopup("event")}}>
            <div className="navbar-link-opt">
                New Events  <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
            
            {
                eventpopup && <div className="navbar-dropdown-popup event-pop">
                {
                    events.map((item,index)=>{
                        return(
                            <div className="popup-notification">.{item.title}</div>
                        );
                    })
                }               
                </div>
            }
        </div>
        <div className="navbar-links event-link" onMouseEnter={()=>{handleOpenPopup("helpline")}} onMouseLeave={()=>{handleClosePopup("helpline")}}>
            <div className="navbar-link-opt">
                Helpline <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
            {
                helpline && <div className="navbar-dropdown-popup helpline-pop">
                <div className="popup-notification">
                    -Disaster Management : 1107 <br />
                    -Ragging : 6969
                </div>
        </div>
            }
        </div>
      </div>

      {
        location.pathname==="/" && <div className="header-banner">
        <img src={image6} className="header-banner-image" alt="" />
      </div>
      }
      <ToastContainer/>
    </div>
  )
}


export default Header
