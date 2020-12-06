import { Schema, model, ObjectId } from 'mongoose';


/**
 * @var {String} email
 * @var {ObjectId} stil
 * @var {Date} createdAt
 */
const bookmarkSchema = new Schema({
    email: { type: String, required: true },
    stil: { type: ObjectId, required: true, ref: 'stil' },
    createdAt: { type: Date, default: Date.now },
});

/**
 * Create bookmark
 * @param {String} stilId - Id of stil
 */
bookmarkSchema.statics.create = function ({ email, stil }) {
    return new this({ email, stil }).save();
};

bookmarkSchema.statics.findByEmail = function (email) {
    const dataFromDatabase = this.find({ email }).populate({ path: 'stil', select: '-__v' });
    return dataFromDatabase.filter(each => {
        if (each.content) {
            return each
        }
    })
};

export default model('bookmark', bookmarkSchema);
