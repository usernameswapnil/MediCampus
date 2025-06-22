import React, { useState, useEffect } from "react";
import "./manageEvent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ManageEvent = (props) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`https://medicampus-3.onrender.com/api/notification/get`)
      .then((resp) => {
        console.log(resp);
        setData(resp.data.notifications);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitEvent=async(e)=>{
    e.preventDefault();
    if(title.trim().length===0)return toast.error("Please enter the title");
    props.showLoader();
    await axios.post("https://medicampus-3.onrender.com/api/notification/add",{title},{withCredentials:true}).then((resp)=>{
      setData([resp.data.notification,...data]);
      setTitle("")
    }).catch((err) => {
        toast.error(err?.response?.data?.error);
    })
    .finally(() => {
      props.hideLoader();
    });

  }
  const filterOutEvent=(id)=>{
    let newArr=data.filter((item)=>item._id!==id);
    setData(newArr)
  }
  const handleDeleteEvent=async(id)=>{
    props.showLoader();
    await axios.delete(`https://medicampus-3.onrender.com/api/notification/delete/${id}`,{withCredentials:true}).then((resp)=>{
      filterOutEvent(id)
    }).catch((err) => {
        toast.error(err?.response?.data?.error);
    })
    .finally(() => {
      props.hideLoader();
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmitEvent} action="" className="register-form">
        <div>
          <div className="register-input-box">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="input-box-register mngEventInp"
              type="text"
              placeholder="Add Events"
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn">
          Add
        </button>
      </form>

      <div className="list-staffs">
        {data.map((item, index) => {
          return (
            <div className="list-staff">
              <div>{item.title.slice(0,60)}...</div>
              <div className="list-staff-btns">
                <div onClick={()=>handleDeleteEvent(item._id)} style={{ cursor: "pointer" }}>
                  <DeleteIcon></DeleteIcon>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageEvent;
