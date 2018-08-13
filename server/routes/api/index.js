import { Router } from 'express';
import passport from '../../middleware/passportLocalStrategy';
import products from './products';
import users from './users';
import city from './city';

const apiRouter = Router();

apiRouter.use('/products', passport.authenticate('bearer', { session: false }), products);
apiRouter.use('/users', passport.authenticate('bearer', { session: false }), users);
apiRouter.use('/cities', passport.authenticate('bearer', { session: false }), city);

export default apiRouter;