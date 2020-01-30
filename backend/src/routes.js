import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DeliveryManController from './app/controller/DeliveryManController';
import FileController from './app/controller/FileController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.destroy);

routes.post('/files', upload.single('file'), FileController.store);
export default routes;
