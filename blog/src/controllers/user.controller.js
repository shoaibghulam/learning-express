import { User } from "../models/user.model.js";
// import { hasherPassword } from "../utils/hasers.js";


const get=async (req, res, next) => {
      try {
      
        const data = await User.find({});
        return res.status(200).json(data);
        
      } catch (error) {
        return res.json(error)
      }
}
const SignleUserget=async (req, res) => {
      try {
        const id = req.params.id;
        const data = await User.findById(id);
        return res.status(200).json(data);
        
      } catch (error) {
        return res.json({status:false, message:error})
      }
}

const post=async (req, res, next) => {
    try {
      
        const data = await User.create(req.body)
        data.save();
        res.status(200).json({
            status:true,
            message:"Data has been added successfully",
            data: data
          });
        
    } catch (error) {
        console.log("the error was: " + error)
        console.log("the error was: " + error.collection)
        return res.json({status:false, message:error})
    }
         
}
const update=async (req, res, next) => {
    try {
        const id=req.params.id;
        const data = await User.findByIdAndUpdate(id,req.body, {
            new: true,
            runValidators: true,
          });
        data.save();
        res.status(200).json({
            status:true,
            message:"Data has been added successfully",
            data: data
          });
        
    } catch (error) {
        console.log("the error was: " + error)
        console.log("the error was: " + error.collection)
        return res.json({status:false, message:error})
    }
         
}

const deleteUser=async (req, res) => {
    try {
      const id = req.params.id;
      const data = await User.findByIdAndDelete(id);
      return res.status(200).json({
        
        data:data === null ? "data not found": data
      });
      
    } catch (error) {
        console.log("the error is: " + error);
      return res.json(error)
    }
}

export {
    get,
    SignleUserget,
    post,
    update,
    deleteUser
}