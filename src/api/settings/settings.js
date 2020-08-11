import Boom from '@hapi/boom';
import dal from './dal';

export default {
    async getSettings() {
        return dal.getSettings();
    },

    async setSettings(data) {
        const setting = JSON.parse(JSON.stringify(data));
        if (setting.id) {
            const temp = await dal.getSetting(setting.id);
            setting.modified = Date.now();
            setting.created = temp.created;
            return dal.updateSettings(setting.id, setting);
        }

        const check = await dal.getSettings();

        if (check.length === 0){
            return dal.setSettings(data);
        }

        throw Boom.badRequest('You can only have a single settings document');

    }
};