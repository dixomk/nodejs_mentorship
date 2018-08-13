import { User } from '../../models';

export const getUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if(err) return next(err);

        res.status(200).json(users);
    });
};

export const getUserById = (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
        if(err) return next(err);
        res.status(200).json(user);
    });
};

export const removeUser = (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId).remove((err, user) => {
        if(err) return next(err);
        res.status(200).json(user);
    });
};