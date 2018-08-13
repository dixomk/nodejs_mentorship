import { Router } from 'express';
import api from './api';
import auth from './auth';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-docs/swagger.json';

const router = Router();

router.use('/auth', auth);
router.use('/api', api);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
