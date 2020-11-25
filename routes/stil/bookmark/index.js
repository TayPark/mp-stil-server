import { Router } from 'express';
import * as bookmarkController from './bookmark.ctrl';
const bookmarkRouter = new Router({ mergeParams: true });

bookmarkRouter.post('/', bookmarkController.addBookmark);
bookmarkRouter.delete('/', bookmarkController.deleteBookmark);

export default bookmarkRouter;