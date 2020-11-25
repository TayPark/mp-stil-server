/**
 * external modules
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';

/**
 * libs
 */
import Database from './libs/database';

/**
 * routers
 */
import indexRouter from './routes';
import stilRouter from './routes/stil';
import userRouter from './routes/users';

const app = express();

Database.connect();

/**
 * use middlewares
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * use routers
 */
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/stil', stilRouter);

app.use((req, res, next) => {
    next(createError(404, 'Wrong access'));
});

/**
 * integrated error handling
 */
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message,
    });
});

/**
 * exceptionally use commonJS syntax for ./bin/www
 */
module.exports = app;
