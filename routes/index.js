import { Router } from 'express';
const indexRouter = new Router();

indexRouter.get('/', function (req, res, next) {
  return res.status(200).json({
    message: 'server is healthy!',
  });
});

export default indexRouter;
