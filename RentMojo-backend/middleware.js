const { user } = require('./schemma')
const jwt = require('jsonwebtoken')
const tokenVerification = async(req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token)
        res.status(401).json({error:"unauthorized/ token not found"})
    try{
        const received = jwt.verify(token,process.env.SECRET_KEY)
        console.log(JSON.stringify(received))
        req.user = await user.findOne({username:received.username}).select("-password")
        next()
    }catch(err){
        res.status(403).json({error:`Forbidden`})
    }
}
const roleVerification = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
};
module.exports = {tokenVerification,roleVerification}