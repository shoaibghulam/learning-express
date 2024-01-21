import { Post } from "../models/post.model.js"


const get=async(req, res, next) => {
    try {
        const data = await Post.find({});
        res.status(200).json({
            status:true,
            // message:"Category has been added successfully",
            data: data
          });
    } catch (error) {
        return res.json({status:false, message:error})
    }
}
const post= async (req, res, next)=>{
     try{

        const data = await Post.create(req.body)
        // data.save()
        res.status(200).json({
            status:true,
            message:"Post has been added successfully",
            data: data
          });
        //  res.status(200).json()
     } catch (error) {
        return res.json(error)
     }
    }

const put= async (req, res, next)=>{
     try{
        const id = req.params.id
        const data = await Category.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators: true
        });

        
        res.status(200).json({
            status:true,
            message:"Category has been added successfully",
            data: data
          });
        //  res.status(200).json()
     } catch (error) {
        return res.json(error)
     }
    }

   const deleteCategory=async (req, res) => {
        try {
          const id = req.params.id;
          const data = await Category.findByIdAndDelete(id);
          return res.status(200).json({
            status: true,
            message:"Category deleted",
            data:data === null ? "data not found": data
          });
          
        } catch (error) {
            console.log("the error is: " + error);
          return res.json(error)
        }
    }
    

    export {
        get,
        post,
        deleteCategory,
        put
    }