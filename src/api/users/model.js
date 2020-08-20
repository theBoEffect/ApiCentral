import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';

mongoose.set('useCreateIndex', true);
const localUserSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    _id: {
        type: String,
        default: uuid
    }
},{ _id: false });

localUserSchema.virtual('id').get(function(){
    return this._id.toString();
});

localUserSchema.set('toJSON', {
    virtuals: true
});

localUserSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
};

localUserSchema.pre('save', function(callback) {
    const account = this;

    if (!account.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return callback(err);

        bcrypt.hash(account.password, salt, (err, hash) => {
            if (err) return callback(err);
            account.password = hash;
            callback();
        });
    });
});

localUserSchema.methods.verifyPassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) return reject(err);
            return resolve(isMatch)
        });
    })
};

// Export the Mongoose model
export default mongoose.model('local-users', localUserSchema);