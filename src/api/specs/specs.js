import jsonPatch from 'jsonpatch';
import dal from './dal';
import helper from '../../helper';

export default {
    async writeSpec(data) {
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
        const patched = jsonPatch.apply_patch(JSON.parse(JSON.stringify(spec)), update);
        return dal.patchSpec(id, patched);
    }
};