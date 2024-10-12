const mongoose = require('mongoose')
const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')

//get all blogs
exports.getAllBlogsController = async (req, res) => {
    try{
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No Blogs Found"
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:"All Blogs Lists",
            blogs            
        });
        
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error while Getting Blog",
            err
        })
    }
};

//create blog
//Create Blog
exports.createBlogController = async (req, res) => {
    try {
      const { title, description, image, user } = req.body;
      //validation
      if (!title || !description || !image || !user) {
        return res.status(400).send({
          success: false,
          message: "Please Provide ALl Fields",
        });
      }
      const exisitingUser = await userModel.findById(user);
      //validaton
      if (!exisitingUser) {
        return res.status(404).send({
          success: false,
          message: "unable to find user",
        });
      }
  
      const newBlog = new blogModel({ title, description, image, user });
      const session = await mongoose.startSession();
      session.startTransaction();
      await newBlog.save({ session });
      exisitingUser.blogs.push(newBlog);
      await exisitingUser.save({ session });
      await session.commitTransaction();
      await newBlog.save();
      return res.status(201).send({
        success: true,
        message: "Blog Created!",
        newBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error WHile Creting blog",
        error,
      });
    }
  };

//update blog
exports.updateBlogController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title,description,image}=req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"blog updated successfully",
            blog
        })

    }catch(err){
        console.log(err);
        return res.status(400).send({
            success:false,
            message:"error while updating the blog ",
            err
        })
    }
}

//get blog
exports.getBlogByIdController = async (req, res) => {
    try{
        const {id} = req.params;
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'Blog not found with this id'

            })
        }
        return res.status(200).send({
            success:true,
            message:"single blog fetched successfully",
            blog
        })
    }catch(err){
        console.log(err);
        return res.status(400).send({
            success:false,
            message:"Error while getting blog",
            err
        })
    }
}

//delete blog
exports.deleteBlogController = async (req, res) => {
    try{
        
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');

        if(!blog){
            return res.status(404).send({
                success:false,
                message:'Blog not found with this id'
            })
        }
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"blog deleted successfully",
            blog
        })

    }catch(err){
        console.log(err);
        return res.status(400).send({
            success:false,
            message:"Error while deleting blog",
            err
        })
    }
}

exports.userBlogController = async(req,res)=>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"blogs not found with this id"
            })
        }

        return res.status(200).send({
            success:true,
            message:"user blogs",
            userBlog
        })

    }catch(err){
        console.log(err);
        return res.status(400).send({
            success:false,
            message:"error in userBlogContrller",
            err
        })
    }
}