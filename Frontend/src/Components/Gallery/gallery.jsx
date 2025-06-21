import React,{useState,useEffect} from 'react'
import "./gallery.css"
import axios from 'axios';
import image1 from "../../Images/image1.jpg";
const Gallery = (props) => {
  const[data,setData]=useState([]);
  useEffect(()=>{
      const fetchData=async()=>{
        props.showLoader()
        await axios.get("http://localhost:4000/api/gallery/get").then((response)=>{
          setData(response.data.images);
        }).catch(err=>{
          console.log(err); 
        }).finally(()=>{
          props.hideLoader()
        })
      }
      fetchData();
  },[])
  return (
    <div className="gallery-home">

      {
        data.map((item,index)=>{
          return(
            <div key={index} className="gallery-home-image-block">
              <img src={item.link}  className="gallery-home-image" alt="" />
            </div>
          );
        })
      }
      

      
    </div>
    
  )
}

export default Gallery
