import { Router } from 'express';
import * as stilController from './stil.ctrl';
import bookmark from './bookmark';
const stilRouter = new Router({ mergeParams: true });

stilRouter.get('/', stilController.getStilByType);
stilRouter.post('/', stilController.deploy);
stilRouter.delete('/', stilController.deleteStil);

stilRouter.use('/bookmark', bookmark);

export default stilRouter;
