const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config({path: './.env'});

const userAuthentication = async(req, res, next)=>{
    try {
        const {authToken} = req.cookies;
        if(!authToken){
            return res.status(401).json({message: 'Unauthorized Access!'})
        }
        const secretKey = process.env.SECRET_KEY;
                    jwt.verify(authToken, secretKey, (error, decoded)=>{
                        if(error){
                            return res.status(403).json({message: 'Access Denied!'});
                        }
                        req.user = decoded; // Store entire decoded token object, not just _id
                        return next();
                    })
        
    } catch (error) {
        console.log('Some error in server authentication', error);
        return res.status(500).json({message: 'Internal Server Error!'})
        
    }
}

module.exports = userAuthentication;