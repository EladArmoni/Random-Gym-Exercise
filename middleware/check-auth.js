import Jwt from "jsonwebtoken";

const checkAuth=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        Jwt.verify(token,process.env.JWT_KEY);
        next();
    }
    catch(error){
        res.status(401).json({message: "Auth Failed."})
    }
}

export default checkAuth;