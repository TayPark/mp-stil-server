import * as models from './../../models/index';
import createError from 'http-errors';

export const getStilByType = async (req, res, next) => {
  const requestType = req.query.type;
  const email = req.query.email;
  const projectionOpt = { __v: 0 };
  let resultData;

  try {
    if (requestType === 'my') {
      const temp = await models.Stil.findOne({ author: email, deployed: false }, projectionOpt);
      if (temp) {
        resultData = temp.contentSet;
      } else {
        resultData = [];
      }
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

export const addMyTil = async (req, res, next) => {
  const { content, author } = req.body;

  try {
    const myTIL = await models.Stil.findOne({ author, deployed: false });
    const contentObj = { content, checked: false };
    if (myTIL) {
      await models.Stil.updateOne({ _id: myTIL._id }, { $push: { contentSet: contentObj } });
    } else {
      await new models.Stil({ author, contentSet: [contentObj] }).save();
    }

    const updatedTil = await models.Stil.findOne({ author, deployed: false });
    return res.status(200).json({ ok: 1, data: updatedTil.contentSet });
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};

export const toggleItem = async (req, res, next) => {
  const { author, toggle, itemId } = req.body;
  try {
    await models.Stil.updateOne(
      { author, 'contentSet._id': itemId },
      { $set: { 'contentSet.$.checked': toggle } }
    );
    return res.status(200).json({
      ok: 1,
    });
  } catch (e) {
    console.log(e);
    next(createError(e));
  }
};

export const updateMyTil = async (req, res, next) => {
  const { content, author, itemId } = req.body;

  try {
    const myTIL = await models.Stil.findOne({ author, deployed: false });
    if (myTIL) {
      await models.Stil.updateOne(
        { author, 'contentSet._id': itemId },
        { $set: { 'contentSet.$.content': content } }
      );
    } else {
      return next(createError(400));
    }
    const updatedTil = await models.Stil.findOne({ author, deployed: false });
    return res.status(200).json({ ok: 1, data: updatedTil.contentSet });
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};

export const deleteOne = async (req, res, next) => {
  const { author, itemId } = req.body;

  try {
    const myTIL = await models.Stil.findOne({ author, deployed: false });
    if (myTIL) {
      await models.Stil.updateOne(
        { author, deployed: false },
        { $pull: { contentSet: { _id: itemId } } }
      );
    } else {
      return next(createError(400));
    }
    const updatedTil = await models.Stil.findOne({ author, deployed: false });
    return res.status(200).json({ ok: 1, data: updatedTil.contentSet })
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
}

export const deploy = async (req, res, next) => {
  const { title, summary, author } = req.body;

  if (!title || !summary) {
    return next(createError(400, '제목이나 요약이 비었습니다.'));
  }

  try {
    const undeployedData = await models.Stil.findOne({ author, deployed: false });
    if (undeployedData) {
      const contentData = [];
      for (let data of undeployedData.contentSet) {
        contentData.push(data.content);
      }
      console.log(contentData);
      await models.Stil.updateOne(
        { _id: undeployedData._id },
        {
          $set: { title, summary, deployed: true },
          $push: { content: contentData },
          $unset: { contentSet: 1 },
        },
        { multi: true }
      );
      return res.status(200).json({ ok: 1 });
    } else {
      next(createError(404, 'TIL이 비었습니다.'));
    }
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};

export const deleteStil = async (req, res, next) => {
  const stilId = req.body.stilId;

  console.log(`Delete targetId is ${stilId}`);

  try {
    const deletion = await models.Stil.deleteOne({ _id: stilId });

    if (deletion.n == 1) {
      const resultData = await models.Stil.find({ deployed: true }, { __v: 0 });
      return res.status(200).json({ ok: 1, data: resultData });
    } else {
      next(createError(400, 'Already processed'));
    }
  } catch (e) {
    console.error(e);
    next(createError(e));
  }
};
