import React, { useState, useEffect } from 'react';
import "./facility.css";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '../../../Components/Modal/modal';
import FacilityModal from './FacilityModal/facilityModal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Facility = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);

  const OnOffModal = function () {
    if (modal) {
      setClickedItem(null);
    }
    setModal(prev => !prev);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios.get("https://medicampus-3.onrender.com/api/facility/get")
      .then((resp) => {
        setData(resp.data.facility);
      })
      .catch(err => {
        toast.error(err?.response?.data?.error || "Error fetching facilities");
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='admin-facility'>
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className="admin-facility-header">
        <div>Facilities</div>
        <div className="add-facility-btn" onClick={OnOffModal}>Add</div>
      </div>

      <div className="admin-facility-rows">
        {
          data.map((item) => (
            <div className="admin-facility-row" key={item._id}>
              <div className="admin-facility-left">
                <div className="admin-facility-title">{item.title}</div>
                <div>{item.description}</div>
                <div style={{ marginTop: "10px" }}>Added by: {item?.addedBy?.name}</div>
              </div>
            </div>
          ))
        }
      </div>

      {
        modal && (
          <Modal headers="Add Facility" handleClose={OnOffModal}>
            <FacilityModal clickedItem={clickedItem} />
          </Modal>
        )
      }

      <ToastContainer />
    </div>
  );
};

export default Facility;
