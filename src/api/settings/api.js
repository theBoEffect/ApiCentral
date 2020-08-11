import { say } from '../../say';
import set from './settings';

const RESOURCE = 'SETTINGS';

const api = {
    async setSettings(req, res, next) {
        try {
            const result = await set.setSettings(req.body);
            return res.respond(say.created(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async getSettings(req, res, next) {
        try {
            const result = await set.getSettings();
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    }
};

export default api;