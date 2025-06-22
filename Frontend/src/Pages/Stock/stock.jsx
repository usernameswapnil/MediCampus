import React,{useState,useEffect} from 'react'
import "./stock.css";
import SearchBox from "../../Components/SearchBox/searchBox";
import TableComp from '../../Components/Table/tableComp';
import axios from 'axios';
const Stock = (props) => {
  const[medicineName,setMedicineName]=useState("");
  const[stocks,setStocks]=useState([]);
  const handleInputChange=function(value){
    setMedicineName(value);
  }
  const headers=["Sr.No.","Name","Quantity","Usage"];
  
  const getFormattedData=(data)=>{
    let newarr=data.map((item,ind)=>{
      return {srNo:ind+1,name:item.name,quantity:item.quantity,usage:item.usage}
    })
    setStocks(newarr);
  }

  const fetchData=async()=>{
    props.showLoader();
    await axios.get(`https://medicampus-3.onrender.com/api/medicine/search-by-name?name=${medicineName}`).then((response)=>{
      
      if(response.data.medicines.length===0){
        setStocks([]);
      }
      getFormattedData(response.data.medicines)
      
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      props.hideLoader(); 
    })
  }
  useEffect(()=>{
    fetchData()
  },[medicineName])
  return (
    <div>
        <div className="stock-page">
          <SearchBox placeholder="Search Medicine" value={medicineName} onChange={handleInputChange}></SearchBox>
           <div className="stock-page-card">
              <TableComp header={headers} data={stocks}></TableComp>
           </div>
        </div>
    </div>
  )
}

export default Stock
