const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtAuthorization={
    sign:(payload)=>{
        return jwt.sign(payload,process.env.secret_key);
    },
    verifyToken:(req,res,next)=>{
        const token=req.headers.authorization?req.headers.authorization.split(" ")[1]:req.headers.Authorization?req.headers.Authorization.split(" ")[1]:undefined;
        if(!token){
           return res.status(401).json({message:"NO TOKEN PROVIDED"});
        }
        try{
            const payload=jwt.verify(token,process.env.secret_key);
            if(payload){
            const clientReq=req.body;
            req.body=payload;
            req.body.old=clientReq;
            next();
        }else{
            res.status(403).json({message:"Token is not verified"});
        }
        }catch(e){
            console.log(e);
            res.status(500).json({message:"Something Went Wrong"});
        }

    }
}
module.exports=jwtAuthorization;