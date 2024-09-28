const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config({ path: './.env' });

const petShopAuth = async (req, res, next) => {
    try {
        const { petshopToken } = req.cookies;
        
        if (!petshopToken) {
            return res.status(401).json({ message: 'Unauthorized Access!' });
        }

        const secretKey = process.env.SECRET_KEY;

        // Verify the token
        
        jwt.verify(petshopToken, secretKey, (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: 'Access Denied' });
            }

            req.petshop = decoded;  // Store the decoded token (user and petshop details)
            next();
        });

    } catch (error) {
        console.log('Error in authentication:', error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

module.exports = petShopAuth;





