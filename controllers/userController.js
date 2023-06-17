const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const User=require('../models/userSchema');
const jwtAuthorization = require('../middlewares/jwtMiddleware');

exports.registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=await req.body;
    if(!name||!email||!password){
        res.status(400).send("All fields are mandatory");
    }else{
        if(await User.findOne({"email":email})){
            res.status(400).send("User already exist");
        }else{
            const hashedPass=await bcrypt.hash(password,10);
            const user=await User.create({
                name,email,password:hashedPass
            });
            console.log(user);
            const token=await jwtMiddleware.sign({user});
            res.status(201).json({"message":"User Created Successfully","Name":user.name,"Email":user.email,"Token":token});
        }
    }
});
exports.getAllUsers=asyncHandler(async(req,res)=>{
        const users=await User.find();
        if(!users){
            res.status(404).send("No user exists");
        }
        else{
            console.log(users);
            res.status(200).json({message:"Users Retrieved Successfully",users,status:true});
        }
});
exports.getUserById=asyncHandler(async(req,res)=>{
    if(req.params.id)
    {const users=await User.findById(req.params.id);
    if(!users){
        res.status(404).send("User doesn't exist");
    }
    else{
        res.status(200).json({message:"User Retrieved Successfully",data:{name:users.name,email:users.email},status:true});
    }
    }
    else{
        res.status(400).send("Id is mandatory");
    }
});
exports.updateUser=asyncHandler(async(req,res)=>{
    const {id,password}=await req.body.old;
    if(!id){
        res.status(400).send("Id is mandatory");
    }else{
        const users=await User.findById(id);
    if(!users){
        res.status(404).send("User doesn't exist");
    }else{
        
        if(await User.findOne({"email":req.body.old.email})){
            res.status(400).send("Email Already Exist");
        }else{
        let updatedUser;   
    
        if(password){
            const hashedPass=await bcrypt.hash(password,10);
        updatedUser=await User.findByIdAndUpdate(id,{...req.body.old,"password":hashedPass},{new:true});
        }
        else{
         updatedUser=await User.findByIdAndUpdate(id,{...req.body.old},{new:true});
    }
    if(updatedUser){
       res.status(201).json({message:"User Updated Successfully",updatedUser}) ;
    }else{
        res.status(500).send("Something Went Wrong");
    }
    }
    }
}

});
exports.userLogin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new error("All Fields are mandatory");
    }else{
        const userReq=await User.findOne({"email":email});
        if(!userReq){
            res.status(404);
            throw new error("User doesn't exist");
        }else{
            const isMatch=await bcrypt.compare(password,userReq.password);
            if(!isMatch){
                res.status(401);
                throw new Error("Email or Password is wrong");
            }else{
                const token=await jwtAuthorization.sign({name:userReq.name,email:userReq.email},process.env.SECRET_KEY);
                res.status(200).json({"title":"Success","message":"User Logged in Successfully","AUTH kEY":token});
            }
        }
    }
});
