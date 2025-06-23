
const express=require("express");
const app=express();

require("dotenv").config({ path: "./.env" });
const cookieparser=require("cookie-parser");
const cors=require("cors");




app.use(express.json());
app.use(cookieparser()); 


app.use(cors({
    credentials:true,
    origin:"https://medicampus-3.onrender.com"
}));
require("./connection");


const userRoutes=require("./Routes/user");
const facilityRoutes=require("./Routes/facility");
const medicineRoutes=require("./Routes/medicine");
const hospitalRoutes=require("./Routes/nearByHospital");
const notificationRoutes=require("./Routes/notification");
const galleryRoutes=require("./Routes/gallery");
const historyRoutes=require("./Routes/history"); 

app.use("/api/auth",userRoutes);
app.use("/api/facility",facilityRoutes);
app.use("/api/medicine",medicineRoutes);
app.use("/api/hospital",hospitalRoutes);
app.use("/api/notification",notificationRoutes);
app.use("/api/gallery",galleryRoutes);
app.use("/api/history",historyRoutes);




app.listen(process.env.PORT,()=>{
    console.log("Successfully running on port ",process.env.PORT); 
})


//recovery code: JQB3F11UCM74UEYAZTA9G2HC
