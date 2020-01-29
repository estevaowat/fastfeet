import Router from 'express';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
