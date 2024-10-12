const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
//get all users
exports.getAllUsers = async(req,res) =>{
    try{
        const users = await userModel.find({});
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:"all users data",
            users
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in get all users",
            err
        })
    }
};

//create user register user 
exports.registerController = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        
        //vlaidation
        if(!username||!email||!password){
            return res.status(400).send({
                success:false,
                message:'Please fill all fields'
            })
        }
        //check if user already exists

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:'User already exists'

            })
        }
        //save new user
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new userModel({username,email,password:hashedPassword});
        await user.save();
        return res.status(201).send({
            success:true,
            message:'new user created',
            user
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message:"Error in register callback",
            success:false,
            error
        })
    }
};

//login 
exports.loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;
        //validation
        if(!email||!password){
            return res.status(500).send({
                success:false,
                message:'Please fill all fields'
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:'email is not registered'
            })
        }
        //password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'invalid username or password '
            })
        }
        //all good return 
        return res.status(200).send({
            success:true,
            message:"login successfully",
            user
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in login callback",
            err
        })
    }
}
   