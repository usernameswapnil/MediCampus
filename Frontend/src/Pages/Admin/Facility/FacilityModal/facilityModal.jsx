import React,{useState,useEffect} from 'react'
import "./facilityModal.css";
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
const FacilityModal = (props) => {
    const[inputField,setInputField]=useState({title:"",description:""});
    const handleOnChange=(event,key)=>{
      setInputField({...inputField,[key]:event.target.value});
    }
    useEffect(()=>{
      if(props.clickedItem){
        setInputField({...inputField,                                            })
      }
    },[])
    const updateFacility=async()=>{
      await axios.put(`https://medicampus-3.onrender.com/api/facility/update/${props.clickedItem._id}`,inputField,{withCredentials:true}).then((resp)=>{
        window.location.reload();
      }).catch(err=>{
        toast.error(err?.response?.data?.error)
      })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        if(inputField.title.trim().length===0 || inputField.description.trim().length===0){
          return toast.error("Please enter all the fields")
        }
        if(props.clickedItem){
          updateFacility();
          return;
        }
        await axios.post("https://medicampus-3.onrender.com/api/facility/add",inputField,{withCredentials:true}).then(resp=>{
          window.location.reload();
        }).catch(err=>{
          toast.error(err?.response?.data?.error)
        })
    }
  return (
    <div className='facility-modal'>
      <form className="register-form" action="" onSubmit={handleSubmit}>
                <div className="">
                    <div className="register-input-box">
                        <input value={inputField.title} onChange={(event)=>handleOnChange(event,"title")} className="input-box-register" placeholder="Enter the title"type="text" />
                    </div>
                    <div className="register-input-box" style={{marginTop:20}}>
                        <textarea value={inputField.description} onChange={(event)=>handleOnChange(event,"description")}   cols={450} rows={10} type="text" className='input-box-register' placeholder='Add description' name="" id=""></textarea>
                    </div>

                </div>

                <button type='submit' className='form-btn reg-btn'> {props.clickedItem?"Update":"Add"}</button>
                <ToastContainer/> 
            </form>
    </div>
  )
}

export default FacilityModal
