import createError from 'http-errors';
import * as models from './../../../models';

/**
 * Add a bookmark.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Next express middleware} next
 *
 * @var email - Email to add bookmark
 * @var stil - Stil's objectId to be deleted
 */
export const addBookmark = async (req, res, next) => {
  const { email, stil } = req.body;

  try {
    const creationResult = await models.Bookmark.create({ email, stil });

    if (creationResult) {
      return res.sendStatus(200);
    } else {
      next(createError(400, 'Fail to add bookmark'));
    }
  } catch (e) {
    next(createError(500));
  }
};

/**
 * Delete a bookmark.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Next express middleware} next
 *
 * @var email - Email to delete bookmark
 * @var stil - Stil's objectId to be deleted
 */
export const deleteBookmark = async (req, res, next) => {
  const { email, stil } = req.body;

  try {
    const deletion = await models.Bookmark.deleteOne({ email, stil });

    if (deletion.n == 1) {
      return res.sendStatus(200);
    } else {
      next(createError(400, 'Already processed'));
    }
  } catch (e) {
    next(createError(500));
  }
};
