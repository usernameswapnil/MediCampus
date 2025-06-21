import React, { useState,useEffect } from 'react'
import "./gallery.css";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddModal from './AddModal/addModal';
import DeleteModal from './DeleteModal/deleteModal';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const Gallery = (props) => {
    const[addModal,setModal]=useState(false);
    const[deleteModal,setDeleteModal]=useState(false);
    const[data,setData]=useState([]);
    const[clickedItem,setClickedItem]=useState(null);
    const setAddModalFunc=function(){
        setModal(prev=>!prev);
    }
    const setDeleteModalFunc=function(item=null){
      if(deleteModal){
        setClickedItem(null);
      }else{
        setClickedItem(item)
      }
      setDeleteModal(prev=>!prev);

    }
    const fetchData=async()=>{
      props.showLoader();
      await axios.get("http://localhost:4000/api/gallery/get").then(resp=>{
        console.log(resp);
        setData(resp.data.images);
      }).catch(err=>{
        toast.error(err?.response?.data?.error)
      }).finally(()=>{
        props.hideLoader();
      })
    }
    useEffect(()=>{
      fetchData();
    },[])
  return (
    <div>
      <div className="gallery-admin">
        <div className="go-back"><Link to={"/admin/dashboard"}><ArrowBackIcon/>Back to Dashboard </Link></div>
        <div className="add-pic-gallery-btn" onClick={setAddModalFunc}>
            Add
        </div>
        <div className="gallery-home">
            {
              data.map((item)=>{
                return(
                  <div className="gallery-home-image-block">
                    <img  className="gallery-home-image" onClick={setDeleteModalFunc} src={item.link} alt="" />
                  </div>
                )
              })
            }
            
                  
        </div>
      </div>
      {addModal && <AddModal onClose={setAddModalFunc}></AddModal>}
      {deleteModal && <DeleteModal  clickedItem={clickedItem} onClose={()=>setDeleteModalFunc(item)}/>}
      <ToastContainer/>
    </div>
  )
}

export default Gallery
