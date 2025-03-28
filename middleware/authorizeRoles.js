
const authoriseRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).send({status:403, message:"Access Denied "})
        }
        next();
    }
}

module.exports = authoriseRoles;