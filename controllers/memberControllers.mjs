import { membermodel } from "../models/memberModel.mjs";


export async function getmembers(req,res){
    try{
    const filter={};
    const name = req.query.name;         
    const subcircle = req.query.subcircle; 
    const level = req.query.level;
    if(name){
        filter.name = { $regex: name, $options: "i" };
    }
    if(subcircle){
        filter.subcircle=subcircle;
    }
    if(level){
        filter.level=level;
    }
    const subcircleOptions = ["nodejs","php","java","dotnet"];
    const levelOptions = ["beginner","intermediate","advanced"];
    if(subcircle && !subcircleOptions.includes(subcircle)){
    return res.status(400).json({ message: "Invalid subcircle" });
    }

   if(level && !levelOptions.includes(level)){
    return res.status(400).json({ message: "Invalid level" });
    }
    const members = await membermodel.find(filter).sort({ createdAt: -1 });
    res.json(members);
    }catch(error){
        res.status(500).json({ message: "Failed to get members" })
    }
    
}

export async function addmember (req, res) {
      try{
      const newMember = new membermodel(req.body);
      const subcircleOptions = ["nodejs","php","java","dotnet"];
        const levelOptions = ["beginner","intermediate","advanced"];
    if(!subcircleOptions.includes(newMember.subcircle)) {
    return res.status(400).json({ error: "Invalid subcircle" });
    }

    if(!levelOptions.includes(newMember.level)) {
    return res.status(400).json({ error: "Invalid level" });
    }
    await newMember.save();
      res.status(201).json({
      name: newMember.name,
      subcircle:newMember.subcircle,
      level:newMember.level
    });
  }catch (error) {
    res.status(500).json({ error: 'Failed to create member' });

  }
    }

export async function deleteMember(req, res) {
      try{
         const { id } = req.params;
         const deletedMember = await membermodel.findByIdAndDelete(id);
         if (!deletedMember) 
            {
                return res.status(404).json({ error: 'Not found' });
            }
         return res.status(200).json({
          message: "Member deleted successfully",
          id: deletedMember._id
         });
      }catch(error){
         return res.status(400).json({error:"invalid ID format"});
      }
      }

export async function updateMember(req,res) {
      try{
        const {id}=req.params;
        const updatedmember=await membermodel.findByIdAndUpdate(id,req.body,{ new: true, runValidators: true });
        if(!updatedmember){
          return res.status(404).json({error:"Member Not found"});
        }
        return res.json(updatedmember);
      }catch(error){
        return res.status(400).json({error:"invalid ID format"});
      }
    }