import { say } from '../../say';
import set from './settings';

const RESOURCE = 'SETTINGS';

const api = {
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