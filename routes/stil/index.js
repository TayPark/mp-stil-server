import { Router } from 'express';
import * as stilController from './stil.ctrl';
import bookmark from './bookmark';
const stilRouter = new Router({ mergeParams: true });

stilRouter.get('/', stilController.getStilByType);
stilRouter.post('/', stilController.deploy);
stilRouter.patch('/', stilController.addMyTil);
stilRouter.post('/delete', stilController.deleteStil);
stilRouter.patch('/all', stilController.updateMyTil);

stilRouter.use('/bookmark', bookmark);

export default stilRouter;
