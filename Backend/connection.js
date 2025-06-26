const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://Admin69:mongodbswapnil%40123@cluster1.rpirq.mongodb.net/dispensary-System?retryWrites=true&w=majority").then(res=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.log(err);
})
