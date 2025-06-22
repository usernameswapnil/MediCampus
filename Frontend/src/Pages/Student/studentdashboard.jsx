import React, { useState,useEffect } from 'react'
import "./studentdashboard.css";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from '../../Components/Modal/modal';
import StudentModal from './StudentModal/studentModal';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const Studentdashboard = (props) => {
    let userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    const[modal,setModal]=useState(false);
    const[history,setHistory]=useState([]);
    const[selectedHistory,setSelectedHistory]=useState(null);
    const fetchData=async()=>{
      props.showLoader();
      await axios.get(`https://medicampus-3.onrender.com/api/history/get?roll=${userInfo?.roll}`,{withCredentials:true}).then(resp=>{
        console.log(resp);
        setHistory(resp.data.history)
      }).catch(err => {
          toast.error(err?.response?.data?.error)
      }).finally(() => {
          props.hideLoader()
      })
    }
    useEffect(()=>{
      fetchData();
    },[])
    const handleOnOffModal=function(item){
        setModal(prev=>!prev);
        setSelectedHistory(item?item:null);
    }
    
    
  return (
    <div className='student-dashboard'>
      <div className="student-info">
        <div className="welcome-user">Welcome, <span>{userInfo?.name}</span></div>
        <div className="welcome-user">{userInfo?.roll}</div>
        <div className="welcome-user">{userInfo?.email}</div>
      </div>

      <div className="student-data">
        <div className="student-data-header">
            <div className='student-header-title'>View</div>
            <div className="student-header-title">Date</div>

        </div>
        <div className="student-row-items">
            {
              history.map((item,index)=>{
                return(
                  <div className="student-row-item" key={index}>
                    <div onClick={()=>handleOnOffModal(item)}><RemoveRedEyeIcon sx={{cursor:"pointer"}} /></div>
                    <div>{item.createdAt.slice(0,10).split("-").reverse().join("-")}</div>

                  </div>
                );
              })
            }
        </div>
      </div>
      {modal && <Modal header={"Details"} handleClose={handleOnOffModal} children={<StudentModal selectedHistory={selectedHistory}/>}></Modal>}
      <ToastContainer/>
    </div>
  )
}

export default Studentdashboard
