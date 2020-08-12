import mongoose from 'mongoose';
import { uuid } from 'uuidv4';

mongoose.set('useCreateIndex', true);
const openApiPointerSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date,
        default: Date.now()
    },
    apiSpecJsonUri: {
        type: String,
        required: true
    },
    swaggerUiUrl: String,
    displayTitle: {
        type: String,
        required: true,
        unique: true
    },
    displayDescription: String,
    _id: {
        type: String,
        default: uuid
    }
},{ _id: false });

// Execute before each user.save() call
openApiPointerSchema.pre('save', callback => //console.log('log saved');
    callback());

openApiPointerSchema.virtual('id').get(function(){
    return this._id.toString();
});

openApiPointerSchema.set('toJSON', {
    virtuals: true
});

openApiPointerSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
};

// Export the Mongoose model
export default mongoose.model('api-spec-pointers', openApiPointerSchema);