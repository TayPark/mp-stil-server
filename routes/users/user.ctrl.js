import createError from 'http-errors';
import * as models from '../../models/index';

export const join = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existence = await models.User.findOne({ email });

        if (existence) {
            return next(createError(400, 'Duplicated email'));
        } else {
            const joinResult = await models.User.create(email, password);

            if (joinResult) {
                return res.sendStatus(201);
            } else {
                console.error(joinResult);
                return res.sendStatus(400);
            }
        }
    } catch (e) {
        return next(createError(500));
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const matchResult = await models.User.findOne({ email, password });
        if (matchResult) {
            return res.sendStatus(200);
        } else {
            return next(createError(404, 'No such account'));
        }
    } catch (e) {
        return next(createError(500));
    }
};
