import { Router } from 'express';
import * as stilController from './stil.ctrl';
import bookmark from './bookmark';
const stilRouter = new Router({ mergeParams: true });

stilRouter.get('/', stilController.getStilByType);
stilRouter.post('/', stilController.addMyTil);
stilRouter.patch('/edit', stilController.updateMyTil);
stilRouter.patch('/check', stilController.toggleItem);
stilRouter.patch('/pull', stilController.deleteOne);
stilRouter.post('/deploy', stilController.deploy);
stilRouter.post('/delete', stilController.deleteStil);

stilRouter.use('/bookmark', bookmark);

export default stilRouter;
