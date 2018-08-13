import jsonwebtoken from 'jsonwebtoken';
import config from '../../config/config.json';

export default function getLogin(req, res, next) {
    console.log('user ', req.user);
    const { user } = req;

    if (user) {
        const token = jsonwebtoken.sign({name: user.name}, config.secret, {expiresIn: '7 days'});
        res.json({
            code: '200',
            message: 'OK',
            data: {
                user: {
                    email: user.email,
                    username: user.name,
                    id: user._id
                }
            },
            token
        });
    } else {
        res.json({
            code: '404',
            message: 'Not Found',
            data: 'additional error response data if needed'
        });
    }
};