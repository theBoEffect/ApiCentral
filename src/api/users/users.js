import dal from './dal';
import helper from '../../helper';

export default {
    async writeUser(data) {
        return dal.writeUser(data);
    },

    async getUsers(q) {
        const query = await helper.parseOdataQuery(q);
        return dal.getUsers(query);
    },

    async getUser(id) {
        return dal.getUser(id);
    },

    async deleteUser(id) {
        return dal.deleteUser(id);
    },

    async lookup(email, password) {
        return dal.lookup(email, password);
    }
};