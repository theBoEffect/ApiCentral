import Settings from './model';

export default {
    async setSettings(data) {
        const settings = new Settings(data);
        return settings.save();
    },

    async getSettings() {
        return Settings.find({});
    },

    async getSetting(id) {
        return Settings.findOne({ _id: id });
    },

    async updateSettings(id, data) {
        return Settings.findOneAndUpdate({ _id: id }, data, { new: true, overwrite: true })
    }
};