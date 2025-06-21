import React, { useState, useEffect } from "react";
import "./managemedicine.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchBox from "../../../Components/SearchBox/searchBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../../Components/Modal/modal";
import MedicineModal from "./MedicineModal/medicineModal";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Managemedicine = (props) => {
  const [medicineSearch, setMedicineSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const[clickedMedicine,setClickedMedicine]=useState(null); 
  const [data, setData] = useState([]);
  const onoffmodal = () => {
    if(addModal){
      setClickedMedicine(null)
    }
    setAddModal((prev) => !prev);
  };
  const onChangeValue = function (value) {
    setMedicineSearch(value);
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(
        `http://localhost:4000/api/medicine/search-by-name?name=${medicineSearch}`
      )
      .then((resp) => {
        console.log(resp);
        setData(resp.data.medicines)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const handleEdit=(item)=>{
    setClickedMedicine(item)
    setAddModal(true)

  }
  const filterOutMedicine=(id)=>{
    let newArr=data.filter((item)=>item._id!==id);
    setData(newArr)
  }


  const handleDelete=async(id)=>{
    props.showLoader();
    await axios.delete(`http://localhost:4000/api/medicine/delete/${id}`,{withCredentials:true}).then((resp)=>{
      filterOutMedicine(id)
    }).catch((err) => {
        toast.error(err?.response?.data?.error);
    })
    .finally(() => {
        props.hideLoader();
    });
  }




  useEffect(() => {
    fetchData();
  }, [medicineSearch]);
  return (
    <div className="manageMedicine">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back to Dashboard{" "}
        </Link>
      </div>
      <div className="top-manage-medicine">
        <SearchBox
          placeholder="Search Medicine"
          value={medicineSearch}
          onChange={onChangeValue}
        ></SearchBox>
        <div className="add-manage-medicine" onClick={onoffmodal}>
          Add
        </div>
      </div>

      <div className="manageMedicine-card">
        <div className="report-form-rows">
          <div className="report-form-header">
            <div className="">Sr. No.</div>
            <div className="col-2-mng">Medicine Name</div>
            <div className="col-2-mng">Added by</div>
            <div className="col-3-mng">Quantity</div>
            <div className="">Edit</div>
            <div className="">Delete</div>
          </div>

          <div className="report-form-row-block">
           {
            data.map((item,index)=>{
              return( 
                 <div className="report-form-row">
                  <div className="">{index+1}</div>
                  <div className="col-2-mng">{item.name}</div>
                  <div className="col-2-mng">{item?.addedBy?.name}</div>
                  <div className="col-3-mng">{item.quantity}</div>
                  <div  onClick={()=>handleEdit(item)} className="edit-icon">
                  <EditIcon></EditIcon>
                  </div>
                  <div onClick={()=>handleDelete(item._id)} className="delete-icon">
                  <DeleteIcon></DeleteIcon>
                  </div>
            </div>
              )
            })
           }
           {
            data.length===0  && <div className="report-form-row">
              <div className="">No medicines have been added yet!</div>
              </div>
           }
          </div>
        </div>
      </div>
      {addModal && (
        <Modal
          header="Add Medicine"
          handleClose={onoffmodal}
          children={<MedicineModal clickedMedicine={clickedMedicine} showLoader={props.showLoader} hideLoader={props.hideLoader} />}
        ></Modal>
      )}
      <ToastContainer/>
    </div>
    
  );
};

export default Managemedicine;
