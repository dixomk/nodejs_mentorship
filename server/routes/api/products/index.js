import { Router } from 'express';
import { getProducts, getProductById, removeProduct } from '../../../controllers/api/products';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.delete('/:id', removeProduct);

export default productRouter;