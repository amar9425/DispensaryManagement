const FacilityModel = require('../Models/facility');

exports.addFacility = async(req,res)=>{
    try{
        let body = {...req.body};

        //console.log(req.user)

        const facility = new FacilityModel({...body,addedBy:req.user._id});
        await facility.save();

        res.status(200).json({message:"Facility Added Successfully",facility,})
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Something went Wrong",
            issue:err.message
        });

    }

};

exports.updateFacility = async(req,res)=>{
    try{

        const {id} = req.params;
        const facility = await FacilityModel.findByIdAndUpdate(id,{...req.body,addedBy:req.user._id});

        return res.status(200).json({message:"facility-Update Successfully"})


    }catch (err){
        console.log(err)
        res.status(500).json({
            error:"Something went Wrong",
            issue:err.message
        });
    }

}

exports.getAllFacility= async(req,res)=>{
    try{
        const facility = await FacilityModel.find().populate("addedBy").sort({createdAt:-1});

        res.status(200).json({message:"Facility Fetched Successfully",facility})

    }catch (err){
        console.log(err)
        res.status(500).json({
            error:"Something went Wrong",
            issue:err.message
        });
    }

}

exports.deleteFacility= async(req,res)=>{
    try{
        const {id} = req.params;
        const facility =await FacilityModel.findByIdAndDelete(id);

        if(facility){
            return res.status(200).json({
                message:"facility Deleted Successfully",
                
            });
        }

        return res.status(400).json({
            error:"No Such Facility Found"
        });

    }catch (err){
        console.log(err)
        res.status(500).json({
            error:"Something went Wrong",
            issue:err.message
        });
    }
}
