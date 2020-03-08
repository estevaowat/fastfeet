import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DeliveryManController from './app/controller/DeliveryManController';
import DeliveryController from './app/controller/DeliveryController';
import DeliveryProblemController from './app/controller/DeliveryProblemController';
import WithdrawController from './app/controller/WithdrawController';
import FinishedController from './app/controller/FinishedController';
import FileController from './app/controller/FileController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

routes.get('/deliveryman', DeliveryManController.index);
routes.get('/deliveryman/:id', DeliveryManController.show);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.destroy);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

routes.get('/deliveryman/:id/deliveries', WithdrawController.index);
routes.post(
  '/deliveryman/:deliveryman_id/deliveries/:delivery_id',
  WithdrawController.create
);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.put('/problem/:id/cancel-delivery', DeliveryProblemController.update);

routes.get('/deliveryman/:id/completed-deliveries', FinishedController.index);

routes.get('/files/:id', FileController.show);
routes.post('/files', upload.single('file'), FileController.store);
routes.put('/files/:id', upload.single('file'), FileController.update);
routes.post(
  '/deliveryman/:deliveryman_id/deliveries/:delivery_id/finish',
  upload.single('file'),
  FinishedController.store
);
export default routes;
