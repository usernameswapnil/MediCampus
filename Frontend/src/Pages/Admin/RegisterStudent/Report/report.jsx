import React,{useState,useEffect} from 'react'
import "./report.css";
import SearchBox from '../../../../Components/SearchBox/searchBox';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const Report = (props) => {
    const[searchMedicineName,setSearchMedicineName]=useState("");
    const[dropdown,setdropdown]=useState(false);
    
    const[data,setData]=useState([]);
    const[selectedMedicines,setSelectedMedicines]=useState([]);
    const onChange=(value)=>{
        setSearchMedicineName(value);
    }


  const fetchData = async () => {
    
    await axios
      .get(
        `https://medicampus-3.onrender.com/api/medicine/search-by-name?name=${searchMedicineName}`
      )
      .then((resp) => {
        console.log(resp);
        setData(resp.data.medicines)
        
        setdropdown(true)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        setdropdown(false)
      })
      
  };
  useEffect(()=>{
    fetchData()
  },[searchMedicineName])

  const addMedicine=(item)=>{
        let exist = 0;
        selectedMedicines.map((it)=>{
          if(item._id === it._id){
            exist=1;
          }
        })
        
        item = { ...item, requiredQuantity: "" }
        if (exist === 0) setSelectedMedicines([...selectedMedicines, item]);
        setSearchMedicineName("")
        setdropdown(false)
  }

  const onChangeHandle = (event, ind) => {
    const arr = selectedMedicines.map((item, index) => {
        if (index === ind) {
            if (parseInt(item.quantity) < parseInt(event.target.value)) {
                toast.error("You do not have enough medicine in the store");
                return item; // 
            }

            return { ...item, requiredQuantity: event.target.value }; 
        }
        return item; // 
    });

    setSelectedMedicines(arr);
};

const handleDelete=(item)=>{
  let arr=selectedMedicines.filter((it)=> item!==it._id);
  setSelectedMedicines(arr);
}

const checkInputValid = () => {
  for (let item of selectedMedicines) {
    if (item.requiredQuantity.trim().length === 0) {
      return true; // means invalid
    }
  }
  return false;
};


const handleSubmit=async()=>{
  if(selectedMedicines.length===0) return toast.error("Please select any medicine!")
  if(checkInputValid()) return toast.error("Please enter all the fields")
    await axios.post(`https://medicampus-3.onrender.com/api/history/add`,{roll:props.studentDetail.roll,student:props.studentDetail._id,medicines:selectedMedicines},{withCredentials:true}).then(response=>{
      toast.success(response.data.message);
      setTimeout(()=>{
        props.handleCloseModal();


      },1000)
  }).catch((err) => {
    toast.error(err?.response?.data?.error);
    
  })
}

  return (
    <div className='report-register'>
      <div className="medicine-suggestion-block">
        <SearchBox value={searchMedicineName} onChange={onChange} placeholder="Search Medicine"></SearchBox>
        {
          dropdown && searchMedicineName.trim().length!==0 && <div className="report-dropdown">
          {
            data.map((item)=>{
              return(
                <div className="report-medicine-dropdown" onClick={()=>addMedicine(item)}>{item.name}</div>
                
              );

            })
          }
        </div>
        }
      </div>
    <div className="report-form-rows">
      <div className="report-form-header">
        <div className="col-1-rm">Medicine Name</div>
        <div className="col-2-rm">Quantity left</div>
        <div className="col-3-rm">Required Quantity</div>
        <div className="col-4-rm">Delete</div>
      </div>

      <div className="report-form-row-block">
        {
          selectedMedicines.map((item,index)=>{
            return(
              <div className="report-form-row">
                <div className="col-1-rm">{item.name}</div>
                <div className="col-2-rm">{item.quantity}</div>
                <div className="col-3-rm"><input value={selectedMedicines[index].requiredQuantity} onChange={(event)=>onChangeHandle(event,index)} type="number" className='input-table' /></div>
                <div className="delete-icon col-4-rm " onClick={()=>handleDelete(item._id)}> <DeleteIcon></DeleteIcon> </div>
              </div>
            );
          })
        }

        
      </div>
    </div>

    <div className="modal-submit" onClick={handleSubmit}>Submit</div>
        <ToastContainer/>
    </div>
  )
}

export default Report
