const MedicineModels=require("../Models/medicine");


exports.addMedicine=async(req,res)=>{
    try{
        const {name,quantity,usage}=req.body;
        const medicine=new MedicineModels({name,quantity,usage,addedBy:req.user._id});
        await medicine.save();
        res.status(200).json({message:"Medicine added successfully!",medicine})

 
    }catch(err){
       console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        }) 
    }
}

exports.getMedicine=async(req,res)=>{
    try{
        const medicines=await MedicineModels.find().populate("addedBy","name").sort({createdAt:-1});
        return res.status(200).json({
            message:"Medicines fetched successfully!",
            medicines:medicines

        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        })
    }
}


exports.updateMedicineById=async(req,res)=>{
    try{
        const {id}=req.params;
        let body={...req.body};
        const medicine=await MedicineModels.findByIdAndUpdate(id,{...body,addedBy:req.user._id});
        if(medicine){
            return res.status(200).json({
                message:"Medicines updated successfully!",
            })
        }
        return res.status(400).json({
            error:"No such medicine is found!"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        })

    }
}

exports.searchMedicine=async(req,res)=>{
    try{
        const {name}=req.query;
        const medicines=await MedicineModels.find({name:{$regex:"^"+ name,$options:"i"}}).populate("addedBy").sort({createdAt:-1});

        return res.status(200).json({
            message:"Medicines fetched successfully!",
            medicines:medicines
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        })
    }
}

exports.deleteMedicineById=async(req,res)=>{
    try{
        const {id}=req.params;
        const medicine=await MedicineModels.findByIdAndDelete(id);
        if(medicine){
            return res.status(200).json({
                message:"Medicines deleted successfully!"
            })
        }
        return res.status(400).json({
            error:"No such medicine found"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        })
    }

}