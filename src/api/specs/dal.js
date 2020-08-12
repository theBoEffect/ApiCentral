import Spec from './model';

export default {
    async writeSpec(data) {
        const spec = new Spec(data);
        return spec.save();
    },
    async getSpecs(query) {
        return Spec.find(query.query).select(query.projection).sort(query.sort).skip(query.skip).limit(query.limit);
    },
    async getSpec(id) {
        return Spec.findOne( { _id: id });
    },
    async deleteSpec(id) {
        return Spec.findOneAndRemove({ _id: id });
    },
    async patchSpec(id, data) {
        return Spec.findOneAndUpdate({ _id: id }, data, { new: true, overwrite: true })
    }
};