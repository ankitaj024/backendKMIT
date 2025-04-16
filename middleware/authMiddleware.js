const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      status: 403,
      message: "No token found , please login again",
    });
  }
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err,decoded)=>{
    if(err){
       return res.status(401).json({status:401, message:"Invalid Token"})
    }
    req.userId = decoded.id;
    req.user = decoded;
    // console.log(decoded)
    // console.log(req.userId)
    next()
  })
};

module.exports = verifyToken;
