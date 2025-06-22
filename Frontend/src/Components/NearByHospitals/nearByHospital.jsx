import React,{useState,useEffect} from 'react'
import "./nearByHospital.css";
import TableComp from "../Table/tableComp";
import axios from "axios";
const NearByHospital = (props) => {
  const hospitalheaders=["S.No","Name","Address","Contact"];
  const[rowData,setRowData]=useState([]);
   const getFormattedData=(data)=>{
    let newarr=data.map((item,ind)=>{
      return {srNo:ind+1,name:item.name,address:item.address,contact:item.contact}  
    })
    setRowData(newarr);
  }
  useEffect(()=>{
    props.showLoader();
    const fetchData=async()=>{
      await axios.get("https://medicampus-3.onrender.com/api/hospital/get").then((response)=>{
        getFormattedData(response.data.hospitals);
      }).catch(err=>{
        console.log(err); 
      }).finally(()=>{
        props.hideLoader()
      })
    }
    fetchData();
  },[])
  return (
    <div>
        <TableComp header={hospitalheaders} data={rowData}></TableComp>
    </div>
  )
}
export default NearByHospital
