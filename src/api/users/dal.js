import User from './model';
import Boom from '@hapi/boom';

export default {
    async writeUser(data) {
        const user = new User(data);
        return user.save();
    },
    async getUsers(query) {
        return User.find(query.query).select(query.projection).sort(query.sort).skip(query.skip).limit(query.limit);
    },
    async getUser(id) {
        return User.findOne( { _id: id });
    },
    async deleteUser(id) {
        return User.findOneAndRemove({ _id: id });
    },
    async lookup(email, password) {
        const user = await User.findOne({ email });
        if(await user.verifyPassword(password)){
            return user;
        }
        throw Boom.unauthorized('wrong password')
    }
};