import { Router } from 'express';
import getLogin from '../../controllers/auth';
import passport from '../../middleware/passportLocalStrategy';

const authRouter = Router();

authRouter.post('/', passport.authenticate('local', { session: false }), getLogin);

export default authRouter;