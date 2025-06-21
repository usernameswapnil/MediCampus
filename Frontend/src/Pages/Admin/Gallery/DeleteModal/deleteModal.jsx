import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
const DeleteModal = (props) => {
  const handleDelete=async ()=>{
    if(props.clickedItem){
      await axios.delete(`http://localhost:4000/api/gallery/delete/${props.clickedItem._id}`,{withCredentials:true}).then(resp=>{
      window.location.reload();
      }).catch(err=>{
        alert("Something went wrong!")
        console.log(err);
      })
    }
    
  }
  return (
    <div>
       <div className='addModal'>
      <div className="addModal-card">
        <div>Delete Image</div>
        <div className="modal-add-btn">
            <div className="cancel-modal-btn" onClick={()=> props.onClose()}>Cancel</div>
            <div className="cancel-modal-btn" onClick={handleDelete} ><DeleteIcon></DeleteIcon></div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DeleteModal
