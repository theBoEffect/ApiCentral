const config = require('../../config');

export default {
    async getSettings() {
        return config.SITE_SETTINGS;
    }
};