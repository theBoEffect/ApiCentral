import mongoose from 'mongoose';
import { uuid } from 'uuidv4';

mongoose.set('useCreateIndex', true);
const settingsSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        required: true
    },
    title: String,
    statement: String,
    logoUrl: String,
    bannerTitle: String,
    bannerStatement: String,
    bannerImage: String,
    infoBlocks: [
        {
            image: String,
            title: String,
            body: String
        }
    ],
    _id: {
        type: String,
        default: uuid
    }
},{ _id: false });


// Execute before each user.save() call
settingsSchema.pre('save', callback => //console.log('log saved');
    callback());

settingsSchema.virtual('id').get(function(){
    return this._id.toString();
});

settingsSchema.set('toJSON', {
    virtuals: true
});

settingsSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
};

// Export the Mongoose model
export default mongoose.model('schema-settings', settingsSchema);