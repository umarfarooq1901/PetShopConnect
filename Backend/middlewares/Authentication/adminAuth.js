
const adminAuth = async(req,res, next)=>{
    try {

        if(req.user && req.user.role === 'admin'){
            next();
        }
        else{
            res.status(403).json({message: 'Access denied: Admins only!'})
        }
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error})
    }
}


module.exports = adminAuth;