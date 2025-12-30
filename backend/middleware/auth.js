import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

    const { token} = req.headers;
    //console.log('Auth middleware: token header =', token);

    if(!token){
        return res.json({success: false, msg: 'No authentication token, authorization denied'});
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // Attach userId to the request object instead of mutating body
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export default auth;