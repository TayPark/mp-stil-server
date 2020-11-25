import * as models from './../../models/index';
import createError from 'http-errors';

export const getStilByType = async (req, res, next) => {
    const requestType = req.query.type;
    const email = req.body.email;
    const projectionOpt = { __v: 0 };
    let resultData;

    try {
        if (requestType === 'my') {
            resultData = await models.Stil.find({ author: email, deployed: false }, projectionOpt);
        } else if (requestType === 'share') {
            resultData = await models.Stil.find({ deployed: true }, projectionOpt);
        } else if (requestType === 'bookmark') {
            resultData = await models.Bookmark.findByEmail(email);
        } else {
            next(createError(404, 'Unproper access'));
        }

        return res.status(200).json(resultData);
    } catch (e) {
        next(createError(e));
    }
};

// Get share stils
export const allStil = async (req, res, next) => {
    try {
        const allDataSet = await models.Stil.find();
        return res.status(200).json(allDataSet);
    } catch (e) {
        next(createError(e));
    }
};

export const getBookmark = async (req, res, next) => {
    const email = req.body.email;

    try {
        const resultSet = await models.Stil.find({ author: email });
        return res.status(200).json(resultSet);
    } catch (e) {
        next(createError(e));
    }
};

export const deploy = async (req, res, next) => {
    const { title, summary, content, author } = req.body;

    try {
        await models.Stil.create(title, summary, content, author);
        return res.sendStatus(200);
    } catch (e) {
        next(createError(e));
    }
};

export const deleteStil = async (req, res, next) => {
    const targetId = req.body.targetId;

    try {
        const deletion = await models.Stil.deleteOne({ _id: targetId });

        if (deletion.n == 1) {
            return res.sendStatus(200);
        } else {
            next(createError(400, '이미 처리된 데이터입니다.'));
        }
    } catch (e) {
        next(createError(e));
    }
};
