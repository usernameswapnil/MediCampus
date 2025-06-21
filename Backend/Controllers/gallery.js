const GalleryModal=require("../Models/gallery");

exports.addImage=async(req,res)=>{
    try{
        const {link}=req.body;
        const image=new GalleryModal({link,addedBy:req.user._id});
        await image.save();
        res.status(200).json({message:'Image added Successfuly!',image});
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        })
    }
}

exports.getAllGallery=async(req,res)=>{
    try{
        const images=await GalleryModal.find();
        return res.status(200).json({
            message:"Images have been fetched successfully!",
            images
        })
    }catch(err){
         console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        })
    }
}

exports.deleteImagesById=async(req,res)=>{
    try{
        const {id}=req.params;
        const image=await GalleryModal.findByIdAndDelete(id);
        if(image){
            return res.status(200).json({
                message:"Image have been deleted successfully!"
            })
        }
        return res.status(400).json({
            error:"No such image is found"
        })
    }catch(err){
         console.log(err);
        res.status(500).json({
            error:"Something went wrong",
            issue:err.message
        })
    }
}