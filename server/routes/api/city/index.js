import { Router } from 'express';
import { getCities, createCity, updateCity, removeCity } from '../../../controllers/api/cities';

const cityRouter = Router();

cityRouter.get('/', getCities);
cityRouter.post('/', createCity);
cityRouter.put('/:id', updateCity);
cityRouter.delete('/:id', removeCity);

export default cityRouter;