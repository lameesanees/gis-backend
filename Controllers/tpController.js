const touristreports = require("../Models/tpSchema")

exports.addTp = async(req,res)=>{
    console.log("Inside the add tourist report method");
    const {fullname,location,contact,description}=req.body;
    const tpImage = req.file.filename;
    const userId=req.payload;
    console.log(fullname,location,contact,description,tpImage);
    console.log(userId);
    
    try{
        const existingTouristReport = await touristreports.findOne({contact})
        if(existingTouristReport){
            res.status(404).json("Already exists")
        }
        else{
            const newTpReports = new touristreports({
                fullname,
                location,
                contact,
                description,
                tpImage
            });
            await newTpReports.save()
            res.status(200).json(newTpReports)
            newTpReports
        }
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

exports.getATpReport = async(req,res)=>{
    const searchKey = req.query.search;
    console.log(searchKey);

    const query={
        contact:{$regex:searchKey,$options:"i"}
    }

    const userId=req.payload
    try{
        const ATpReport = await touristreports.find(query);
        if(ATpReport){
            res.status(200).json(ATpReport)
        }else{
            res.status(401).json("Can't find tourist reports")
        }
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}