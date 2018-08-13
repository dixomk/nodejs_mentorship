import jsonwebtoken from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    // check header or for token
    const token = req.header('Authorization');
    console.log('token :  ' + token);
    // decode token
    if (token) {
        const decoded = jsonwebtoken.decode(token);
        if (!decoded) {
            console.log('Error decoded token');
            next(new Error('Error verify token'));
        } else {
            // if everything is good, save to request for use in other routes
            console.log('decoded good' + decoded);
            req.decoded = decoded;
            next();
        }
    } else {
        // if there is no token
        // return an error
        next(new Error('No token provided.'));
    }
};
