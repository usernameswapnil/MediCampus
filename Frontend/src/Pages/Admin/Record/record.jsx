import React,{useEffect, useState} from 'react'
import "./record.css";
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBox from '../../../Components/SearchBox/searchBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from "../../../Components/Modal/modal";
import RecordModal from './RecordModal/recordModal';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import StudentAllFiles from './StudentAllDetails/studentAllFiles';
const Record = (props) => {
    const[studentRoll,setStudentRoll]=useState("");
    const[listOfYear,setListOfYear]=useState([]);
    const[listOfMonth,setListOfMonth]=useState([]);
    const currentYear=new Date().getFullYear();
    const[selectedYear,setSelectedYear]=useState("");
    const[selectedMonth,setSelectedMonth]=useState(""); 
    const[data,setData]=useState([])
    const[selectedHistory,setSelectedHistory]=useState(null);
    const[selectedAllDetails,setSelectedAllDetails]=useState(null);

    const[modal,setModal]=useState(false);
    const[allRecordModel,setAllRecordModel]=useState(false);
    const onOffModal=function(){
        setModal(prev=>!prev);
    }   
    const onOffAllRecordModel=()=>{
        if(allRecordModel){
            setSelectedAllDetails(null) 
        }
        setAllRecordModel(prev=>!prev);

    }
    const onChangeField=function(value){
        setStudentRoll(value);
    }
    const fetchData=async function(){
        props.showLoader();
        await axios.get(`http://localhost:4000/api/history/get-history?month=${selectedMonth}&year=${selectedYear}`,{withCredentials:true}).then(response=>{
            console.log(response)
            setAllRecordModel(true);
            setData(response.data.history);
        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data?.error);

        }).finally(() => {
            props.hideLoader()
        })
    }
    useEffect(function(){
        if(selectedMonth==="" || selectedYear === ""){
            return;
        }
        fetchData();
    },[selectedYear,selectedMonth])



    useEffect(()=>{
        let arr=[];
        for(let i=2025;i<=parseInt(currentYear);i++){
            arr.unshift(i.toString());

        }
        setListOfYear(arr);
        setSelectedYear(arr[0]);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonthIndex=new Date().getMonth();
        const pastAndCurrentMonths=months.slice(0,currentMonthIndex+1);
        setListOfMonth(pastAndCurrentMonths);
        setSelectedMonth(pastAndCurrentMonths[pastAndCurrentMonths.length-1]);

    },[])

    const handleOnOpenModal=(item)=>{
        setModal(prev=>!prev);
        setSelectedHistory(item?item:null)
    }
    const handleClick=async()=>{
        if(studentRoll.trim().length===0) return toast.error("Please Enter the correct Roll No!")
        props.showLoader()
        await axios.get(`http://localhost:4000/api/history/get?roll=${studentRoll}`,{withCredentials:true}).then(resp=>{
            console.log(resp)
            setAllRecordModel(true)
            // setSelectedHistory(resp.data.history)
            // setModal(true); 
            setSelectedAllDetails(resp.data.history); 
        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data?.error);

        }).finally(() => {
            props.hideLoader()
        })

    }
  return (
    <div className='records'>
      <div className="go-back"><Link to={"/admin/dashboard"}><ArrowBackIcon/>Back to Dashboard </Link></div>
      <SearchBox handleClick={handleClick} value={studentRoll} onChange={onChangeField} placeholder="Search by Roll Number"></SearchBox>
      <div className="record-date-block">
        Select year
        <div className="record-date-year">
            {
                listOfYear.map((item,index)=>{
                    return (
                        <div onClick={()=>setSelectedYear(item)} className={`record-year ${selectedYear===item?"active-stats":null}`}>{item}</div>

                    );
                })
            }
            
        </div>

        Select month
        <div className="record-date-year">
        {
                listOfMonth.map((item,index)=>{
                    return (
                        <div onClick={()=>setSelectedMonth(item)} className={`record-year  ${selectedMonth===item?"active-stats":null} `}>{item}</div>

                    );
                })
            }
        </div>
      </div>
    
            
      <div className="manageMedicine-card"> 
      <div className="report-form-rows">
      <div className="report-form-header">
        <div className=''>View</div>
        <div className="col-2-mng">Student Name</div>
        <div className="col-2-mng">Roll number</div>
        <div className="col-3-mng">Date</div>
              

      </div>

      <div className="report-form-row-block">
        {
            data.map((item,index)=>{
                return(
                    <div className="report-form-row">
                    <div className="" onClick={()=>{handleOnOpenModal(item)}}> <VisibilityIcon sx={{cursor:"pointer"}} /></div>
                    <div className="col-2-mng">{item?.student?.name}</div>
                    <div className="col-2-mng">{item?.student?.roll}</div>
                    <div className="col-3-mng">{item.createdAt.slice(0,10).split("-").reverse().join("-")}</div>
        
                    </div>
                )
            })
        }
        {
            data.length===0 && <div className="report-form-row">
            <div className=''>No Records yet</div>
            </div>
        }
      </div>
    </div>
      </div>
      <ToastContainer/>
      {modal && <Modal header="Records" handleClose={onOffModal} children={<RecordModal selectedHistory={selectedHistory}/>} ></Modal>}
      {allRecordModel && <Modal header="All Records" handleClose={onOffAllRecordModel} children={<StudentAllFiles studentAllDetails={selectedAllDetails}/>} ></Modal>}

    </div>
  )
}

export default Record

