import createError from 'http-errors';
import * as models from '../../models/index';

export const join = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('[INFO] Join requested by ' + email, password);
  try {
    const existence = await models.User.findOne({ email });

    if (existence) {
      next(createError(400, 'Duplicated email'));
    } else {
      const joinResult = await models.User.create(email, password);

      if (joinResult) {
        return res.status(201).json({ ok: 1 });
      } else {
        console.error(joinResult);
        next(createError(400, 'Check your account'));
      }
    }
  } catch (e) {
    next(createError(500));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('[INFO] Login requested by ' + email, password);
  try {
    const matchResult = await models.User.findOne({ email, password });
    if (matchResult) {
      return res.status(200).json({ ok: 1 });
    } else {
      next(createError(404, 'No such account'));
    }
  } catch (e) {
    next(createError(500));
  }
};
