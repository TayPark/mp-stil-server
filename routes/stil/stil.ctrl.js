import * as models from './../../models/index';
import createError from 'http-errors';

export const getStilByType = async (req, res, next) => {
  const requestType = req.query.type;
  const email = req.query.email;
  const projectionOpt = { __v: 0 };
  let resultData;

  try {
    if (requestType === 'my') {
      const temp = await models.Stil.find({ author: email, deployed: false }, projectionOpt);
      resultData = temp.map(each => {
        return each.content[0];
      });
    } else if (requestType === 'share') {
      resultData = await models.Stil.find({ deployed: true }, projectionOpt);
    } else if (requestType === 'bookmark') {
      const temp = await models.Bookmark.findByEmail(email);
      resultData = temp.map(each => {
        return each.stil;
      });
    } else {
      next(createError(404, 'Unproper access'));
    }

    return res.status(200).json(resultData);
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};

export const save = async (req, res, next) => {
  const { content, author } = req.body;

  try {
    await models.Stil.updateOne({ author, deploy: false }, { $set: { content } });
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};

export const deploy = async (req, res, next) => {
  const { title, summary, content, author } = req.body;

  try {
    await models.Stil.create(title, summary, content, author);
    return res.status(200).json({ ok: 1 });
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};

export const deleteStil = async (req, res, next) => {
  const { email, stil } = req.body;

  try {
    const deletion = await models.Stil.deleteOne({ email, stil });

    if (deletion.n == 1) {
      return res.status(200).json({ ok: 1 });
    } else {
      next(createError(400, 'Already processed'));
    }
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};
