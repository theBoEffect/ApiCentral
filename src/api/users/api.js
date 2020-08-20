import Boom from '@hapi/boom';
import { say } from '../../say';
import users from './users';

const config = require('../../config');

const RESOURCE = 'USER';

const api = {
    async writeUser(req, res, next) {
        try {
            if(config.SITE_SETTINGS.allowRegister === false) throw Boom.forbidden('Registration is turned off');
            const result = await users.writeUser(req.body);
            return res.respond(say.created(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async getUsers(req, res, next) {
        try {
            const result = await users.getUsers(req.query);
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async getUser(req, res, next) {
        try {
            const result = await users.getUser(req.params.id);
            if (!result) throw Boom.notFound(`id requested was ${req.params.id}`);
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const result = await users.deleteUser(req.params.id);
            if (!result) throw Boom.notFound(`id requested was ${req.params.id}`);
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
};

export default api;