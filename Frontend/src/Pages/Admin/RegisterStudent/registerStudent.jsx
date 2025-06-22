import React,{useState} from 'react'
import "./registerStudent.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import SearchBox from '../../../Components/SearchBox/searchBox';
import Modal from "../../../Components/Modal/modal"
import Report from './Report/report';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
const RegisterStudent = (props) => {
    const[searchStudent,setSearchStudent]=useState("");
    const[reportModal,setreportModal]=useState(false);

    const[studentDetail,setStudentDetail]=useState({_id:"",email:"",name:"",roll:"",mobileNo:"", fatherName:"", fatherMobileNo:"", address:"", previous_health:"", age:"", bloodGroup:""});

    const handleOnChangeInputField=(event,key)=>{
        setStudentDetail({...studentDetail,[key]:event.target.value});
    }

    const openCloseModal=()=>{
        setreportModal(prev=>!prev)
    }
    const handleOnChange=function(value){
        setSearchStudent(value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    const handleSearch=async()=>{
        if(searchStudent.trim().length===0) return toast.error("Please enter the correct Roll Number!")
        props.showLoader();
        await axios.get(`https://medicampus-3.onrender.com/api/auth/get-student-by-roll/${searchStudent}`,{withCredentials:true}).then(resp=>{
            console.log(resp)
            //toast.success(resp.data.message);
            setStudentDetail({...studentDetail,...resp.data.student})
        }).catch(err=>{
            setStudentDetail({_id:"",email:"",name:"",roll:"",mobileNo:"",fatherName:"",fatherMobileNo:"",address:"",previous_health:"",age:"",bloodGroup:""});
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })
    }

    const handleUpdateFunc=async()=>{
        if(studentDetail.name.trim().length===0 || studentDetail.email.trim().length===0 || studentDetail.roll.trim().length===0 || studentDetail.mobileNo.trim().length===0 ) return toast.error("Name,Mobile No and Roll No cannot be left empty!")

        props.showLoader();
        const{_id,updatedAt,...student}={...studentDetail}
        await axios.put(`https://medicampus-3.onrender.com/api/auth/update-student/${_id}`,student,{withCredentials:true}).then(resp=>{
            console.log(resp)
            toast.success(resp.data.message)
        }).catch(err=>{
            toast.error(err?.response?.data?.error);
            console.log(err);
        }).finally(()=>{
            props.hideLoader();
        })

    }

    const registerStudent=async()=>{
        if(studentDetail.name.trim().length===0 || studentDetail.email.trim().length===0 || studentDetail.roll.trim().length===0 || studentDetail.mobileNo.trim().length===0) return toast.error("Name,Mobile No,Email Id and Roll No cannot be left empty!")
        props.showLoader();
        axios.post("hhttps://medicampus-3.onrender.com/api/auth/registerStudentByStaff",studentDetail,{withCredentials:true}).then(response=>{
            toast.success(response.data.message)
        }).catch(err=>{
            console.log(err);
            
            setStudentDetail({_id:"",email:"",name:"",roll:"",mobileNo:"",fatherName:"",fatherMobileNo:"",address:"",previous_health:"",age:"",bloodGroup:""});

            toast.error(err?.response?.data?.error);
            
        }).finally(()=>{
            props.hideLoader();
        })
    }



  return (
    <div className='register-student'>
      <div className="go-back"><Link to={"/admin/dashboard"}><ArrowBackIcon/>Back to Dashboard </Link></div>

      <SearchBox handleClick={handleSearch} placeholder={"Search by Roll Number"} value={searchStudent} onChange={handleOnChange}></SearchBox>
      <div className="register-form-block">
        <div className="register-form-header">
            Register Student
            <form className="register-form" action="" onSubmit={handleSubmit}>
                <div className="register-form-div">
                    <div className="register-input-box">
                        <input value={studentDetail.name} onChange={(event)=>handleOnChangeInputField(event,"name")} className="input-box-register" placeholder="Student's Name"type="text" />
                    </div>

                    <div className="register-input-box">
                        <input disabled={studentDetail?._id} value={studentDetail.email} onChange={(event)=>handleOnChangeInputField(event,"email")} className="input-box-register" placeholder="Email id"type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.roll} onChange={(event)=>handleOnChangeInputField(event,"roll")} className="input-box-register" placeholder="Roll Number" type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.mobileNo} onChange={(event)=>handleOnChangeInputField(event,"mobileNo")}  className="input-box-register" placeholder="Mobile Number"type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.fatherName} onChange={(event)=>handleOnChangeInputField(event,"fatherName")}  className="input-box-register" placeholder="Father's Name" type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.fatherMobileNo} onChange={(event)=>handleOnChangeInputField(event,"fatherMobileNo")} className="input-box-register" placeholder="Father's Mobile Number"type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.address} onChange={(event)=>handleOnChangeInputField(event,"address")} className="input-box-register" placeholder="Address" type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.previous_health} onChange={(event)=>handleOnChangeInputField(event,"previous_health")} className="input-box-register" placeholder="Previous Health Issue"type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.age} onChange={(event)=>handleOnChangeInputField(event,"age")} className="input-box-register" placeholder="Age" type="text" />
                    </div>

                    <div className="register-input-box">
                        <input value={studentDetail.bloodGroup} onChange={(event)=>handleOnChangeInputField(event,"bloodGroup")} className="input-box-register" placeholder="Blood Group" type="text" />
                    </div>
                </div>

                {
                    studentDetail?._id?<div className="block-divs">
                        <button type='button' onClick={handleUpdateFunc} className='form-btn reg-btn'>Update</button>
                        <button type='button' className='form-btn reg-btn' onClick={openCloseModal}>Report</button>
                    </div>
                    :<button type='button' onClick={registerStudent} className='form-btn reg-btn'>Register</button>
                }
            </form>
        </div>
      </div>
      
      {reportModal && <Modal header="Report" handleClose={openCloseModal} children={ <Report studentDetail={studentDetail}/> }    />}
      <ToastContainer/>
    </div>
  )
}

export default RegisterStudent
