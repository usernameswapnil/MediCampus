
import "./staff.css"
import TableComp from "../../Components/Table/tableComp";
import axios from "axios";
import { useEffect,useState } from 'react';
const Staff = (props) => {
  const staffHeader=["Name","Designation","Email Id","Contact No."];
  const[rowData,setRowData]=useState([]);

  const getFormattedData=(data)=>{
    let newarr=data.map((item)=>{
      return {name:item.name,designation:item.designation,email:item.email,contactNo:item.mobileNo}
    })
    setRowData(newarr);
  }
  const fetchData=async()=>{
    props.showLoader(); 
    await axios.get("https://medicampus-3.onrender.com/api/auth/get-staff").then((response)=>{
     
      getFormattedData(response.data.staffs)
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      props.hideLoader()
    })
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="staff">
      <TableComp header={staffHeader} data={rowData}></TableComp>

    </div>
  )
}

export default Staff
