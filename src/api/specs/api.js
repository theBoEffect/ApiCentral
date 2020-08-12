import Boom from '@hapi/boom';
import { say } from '../../say';
import specs from './specs';

const RESOURCE = 'OPEN API RECORD';

const api = {
    async writeSpec(req, res, next) {
        try {
            const result = await specs.writeSpec(req.body);
            return res.respond(say.created(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async getSpecs(req, res, next) {
        try {
            const result = await specs.getSpecs(req.query);
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async getSpec(req, res, next) {
        try {
            const result = await specs.getSpec(req.params.id);
            if (!result) throw Boom.notFound(`id requested was ${req.params.id}`);
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async patchSpec(req, res, next) {
        try {
            const result = await specs.patchSpec(req.params.id, req.body);
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
    async deleteSpec(req, res, next) {
        try {
            const result = await specs.deleteSpec(req.params.id);
            if (!result) throw Boom.notFound(`id requested was ${req.params.id}`);
            return res.respond(say.ok(result, RESOURCE));
        } catch (error) {
            next(error);
        }
    },
};

export default api;