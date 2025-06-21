const mongoose=require("mongoose");
mongoose.connect("mongodb://Admin69:swapnilhero123@cluster1-shard-00-00.rpirq.mongodb.net:27017,cluster1-shard-00-01.rpirq.mongodb.net:27017,cluster1-shard-00-02.rpirq.mongodb.net:27017/dispensary-System?replicaSet=atlas-tmwehx-shard-0&ssl=true&authSource=admin").then(res=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.log(err);
})