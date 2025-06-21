import React from 'react'
import "./footer.css";
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import image2 from "../../Images/image2.jpg";
import CloudIcon from '@mui/icons-material/Cloud';
const Footer = () => {
    const todayDate=new Date();
  return (
    <div className="footer">
        <div className="footer-left">
            <img src={image2} className='footer-logo' alt="" />
            <div className="footer-text-white">XYZ Institute Of Technology</div>
            <div className="footer-text-white">Delhi</div>
            <div className="footer-text-smaller">Pauri(Garhwal)-23424</div>
            <div className="footer-text-smaller"> <PhoneIcon></PhoneIcon> 1346-257400</div>
            <div className="footer-text-smaller"> <LanguageIcon></LanguageIcon> www.xyz.ac.in</div>
        </div>


        <div className="footer-center">
            <div className="important-link">Important Links</div>
            <a href="https://www.antiragging.in/" target="_blank">Anti-Ragging Initiative</a>
            <a href="https://www.nitrkl.ac.in/CDC/Statistics" target="_blank">Careere Counselling and Placement Information</a>
            <a href="https://rti.gov.in/" target="_blank">Right to Information</a>
            <a href="https://www.nitrkl.ac.in/" target="_blank">College Official Website  </a>
            <a href="https://website.nitrkl.ac.in/Home/Announcement/" target="_blank">Announcements</a>
        </div>

        <div className="footer-right">
            <div className="footer-right-name"> <CloudIcon></CloudIcon> XYZ Delhi</div>
            <div className="today-date-footer">
                {todayDate.toDateString()}
            </div>
        </div>
    </div>
  )
}

export default Footer

