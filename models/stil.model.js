import mongoose from 'mongoose';
// const ObjectId = mongoose.ObjectId;

/**
 * @var title - Title of a stil
 * @var summary - Summary of a stil
 * @var content - Full content of a stil
 * @var createdAt - Date which stil created
 * @var author - Author of stil
 */
const stilSchema = new mongoose.Schema({
    title: { type: String },
    summary: { type: String },
    content: { type: [String], required: true },
    createdAt: { type: String, default: Date.now },
    author: { type: String, required: true },
    deployed: { type: Boolean, default: false }
});

/**
 * Create STIL
 * @param {String} title
 * @param {String} summary
 * @param {String} content
 * @param {String} author
 */
stilSchema.statics.create = function (author, content) {
    return new this({ author, content }).save();
};

stilSchema.statics.deploy = function (title, summary, content, author) {
    return this.updateOne({ author, deployed: false}, { title, summary, content });
}

export default mongoose.model('stil', stilSchema);
