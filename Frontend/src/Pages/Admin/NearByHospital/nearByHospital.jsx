import React, { useState,useEffect } from 'react'
import "./nearByHospital.css";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../../Components/Modal/modal';
import NearByModal from './NearByModal/nearByModal';
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
const NearByHospital = (props) => {
    const[modal,setModal]=useState(false);
    const[data,setData]=useState([]);
    const[clickedItem,setClickedItem]=useState(null);

    const OnOffModal=function(){
        setModal(prev=>!prev);
        if(modal){
          setClickedItem(null);
        }
    }
    const fetchData=async()=>{
      props.showLoader();
      await axios.get("http://localhost:4000/api/hospital/get").then(resp=>{
        setData(resp.data.hospitals);
        console.log(resp)
        
      }).catch(err=>{
        toast.error(err?.response?.data?.error);

      }).finally(()=>{
        props.hideLoader();
      })
    

  }
  useEffect(()=>{
      fetchData();
    },[])
  

  const handleItem=(item)=>{
    setClickedItem(item);
    setModal(true);

  }

  const filterOutData=(id)=>{
    let newArr=data.filter((item=>item._id!==id))
    setData(newArr);
  }

  const handleDelete=async(id)=>{
    props.showLoader();
    await axios.delete(`http://localhost:4000/api/hospital/delete/${id}`,{withCredentials:true}).then(resp=>{
      filterOutData(id)
    }).catch(err=>{
      toast.error(err?.response?.data?.error);
    }).finally(()=>{
      props.hideLoader();
    })
  }

  return (
    <div className='admin-facility'>
      <div className="go-back"><Link to={"/admin/dashboard"}><ArrowBackIcon/>Back to Dashboard </Link></div>
      <div className="admin-facility-header">
        <div>Nearby Hospital</div>
        <div className="add-facility-btn" onClick={OnOffModal}>Add</div>
      </div>

      <div className="admin-facility-rows"> 
        {
          data.map((item,index)=>{
            return(
              <div className="admin-facility-row" key={item._id}>
            <div className="admin-facility-left">
                <div className="admin-facility-title">{item.name}</div>
                <div>Address:{item.address}</div>
                <div>{item.contact}</div>
                <div style={{marginTop:"10px"}}>Added by:{item?.addedBy?.name}</div>
            </div>

            <div className="admin-facility-btn">
                <div onClick={()=>(handleItem(item))}><EditIcon/></div>
                <div onClick={()=>(handleDelete(item._id))}><DeleteIcon></DeleteIcon></div>
            </div>

            
        </div>
            );
          })
        }
      </div>
      {
         modal && <Modal headers="Add Facility" handleClose={OnOffModal} children={ <NearByModal clickedItem={clickedItem}/>}></Modal> 
      }

      <ToastContainer/>
    </div>
  )
}

export default NearByHospital
