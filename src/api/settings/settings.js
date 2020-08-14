import Boom from '@hapi/boom';
import dal from './dal';

export default {
    async getSettings() {
        return dal.getSettings();
    }
};