import jsonPatch from 'jsonpatch';
import axios from 'axios';
import Boom from '@hapi/boom';
import dal from './dal';
import helper from '../../helper';

export default {
    async writeSpec(data) {
        try {
            const check = await axios.get(data.apiSpecJsonUri);
            if (!check.data) throw 0;
            if (!check.data.openapi) throw 0;
        } catch (error) {
            throw Boom.expectationFailed('the OpenAPI URI did not point to a valid OpenAPI specification');
        }

        if (data.swaggerUiUrl) {
            try {
                const check = await axios.get(data.swaggerUiUrl);
                if (!check.data) throw 0;
            } catch (error) {
                throw Boom.expectationFailed('the swagger UI link did not load as expected');
            }
        }

        return dal.writeSpec(data);
    },

    async getSpecs(q) {
        const query = await helper.parseOdataQuery(q);
        return dal.getSpecs(query);
    },

    async getSpec(id) {
        return dal.getSpec(id);
    },

    async deleteSpec(id) {
        return dal.deleteSpec(id);
    },

    async patchSpec(id, update) {
        const spec = await dal.getSpec(id);
        if(!spec) throw Boom.notFound(`failed to fetch ${id}`);
        const patched = jsonPatch.apply_patch(JSON.parse(JSON.stringify(spec)), update);
        return dal.patchSpec(id, patched);
    }
};