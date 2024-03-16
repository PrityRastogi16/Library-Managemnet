const jwt = require("jsonwebtoken");
const auth = async(req, res,next)=>{
    const token  = req.headers.authorization?.split(" ")[1];
    if(token){
        try{
            const decoded = jwt.verify(token,"prits");
            if(decoded){
                req.body.userID=decoded.userID;
                req.body.name=decoded.user;
                next()
            }else{
                res.json({msg:"Not authorized"})
            }
        }
        catch(err){
      console.log(err);
      res.json(err);
        }
    }else{
        res.json({msg:"you r not login"})
    }
}


module.exports = {
    auth
}