import React, { useState, useEffect } from 'react';
import './facilities.css';
import axios from 'axios';

const Facilities = (props) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    props.showLoader();
    try {
      const response = await axios.get("http://localhost:4000/api/facility/get");
      setData(response.data.facility);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      props.hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    props.showLoader();
    try {
      await axios.delete(`http://localhost:4000/api/facility/delete/${id}`);
      // Remove deleted item from local state
      setData(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    } finally {
      props.hideLoader();
    }
  };

  const handleEdit = (item) => {
    // You can open a modal or redirect to an edit page
    console.log("Edit clicked:", item);
    // props.openEditModal(item); // example
  };

  return (
    <div className='facility'>
      <div className="facility-header">List of facilities available</div>
      <div className="facility-lists">
        {data.map((item) => (
          <div className="facility-list" key={item._id}>
            <div className="facility-list-header">{item.title}</div>
            <p className="facility-list-value">{item.description}</p>
            {/* <div className="facility-buttons">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
