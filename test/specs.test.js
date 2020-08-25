import '@babel/register';
import "regenerator-runtime/runtime";
import mockingoose from 'mockingoose';
import Model from '../src/api/specs/model';
import spec from '../src/api/specs/specs';

const oneSpec = {
    "created": "2020-03-23T02:11:49.000Z",
    "modified": "2020-03-23T02:11:49.000Z",
    "apiSpecJsonUri": "https://petstore.swagger.io/v2/swagger.json",
    "swaggerUiUrl": "https://petstore.swagger.io",
    "displayTitle": "Pet Store",
    "displayDescription": "Pet store swagger",
    "_id": "4dd31c2c-be8b-4f96-8d30-40ce1b0a42fb"
};

const multiSpecs = [
    {
        "created": "2020-03-23T02:11:49.000Z",
        "modified": "2020-03-23T02:11:49.000Z",
        "apiSpecJsonUri": "https://petstore.swagger.io/v2/swagger.json",
        "swaggerUiUrl": "https://petstore.swagger.io",
        "displayTitle": "Pet Store",
        "displayDescription": "Pet store swagger",
        "_id": "4dd31c2c-be8b-4f96-8d30-40ce1b0a42fb"
    },
    {
        "created": "2020-04-23T02:11:49.000Z",
        "modified": "2020-04-23T02:11:49.000Z",
        "apiSpecJsonUri": "https://petstore.swagger.io/v2/swagger.json",
        "swaggerUiUrl": "https://petstore.swagger.io",
        "displayTitle": "Pet Store Two",
        "displayDescription": "Another pet store store swagger",
        "_id": "4dd31c2c-be8b-4f96-8d30-40ce1b0a42ec"
    }
];

describe('Spec DAL tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockingoose.resetAll();
        Model.Query.prototype.findOne.mockClear();
    });

    it('write a spec with swagger v2', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "apiSpecJsonUri": "https://petstore.swagger.io/v2/swagger.json",
                "swaggerUiUrl": "https://petstore.swagger.io",
                "displayTitle": "Pet Store",
                "displayDescription": "Pet store swagger"
            };
            const result = await spec.writeSpec(data, true);
            expect(Model.prototype.save).toHaveBeenCalled();
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('write a spec with swagger v3', async () => {
        try {
            // Doesn't really matter what mongo is returning here
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "apiSpecJsonUri": "https://petstore3.swagger.io/api/v3/openapi.json",
                "swaggerUiUrl": "https://petstore3.swagger.io/",
                "displayTitle": "Pet Store",
                "displayDescription": "Pet store swagger"
            };
            const result = await spec.writeSpec(data, true);
            expect(Model.prototype.save).toHaveBeenCalled();
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('write a spec with swagger v3 no UI specified', async () => {
        try {
            // Doesn't really matter what mongo is returning here
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "apiSpecJsonUri": "https://petstore3.swagger.io/api/v3/openapi.json",
                "displayTitle": "Pet Store",
                "displayDescription": "Pet store swagger"
            };
            const result = await spec.writeSpec(data, true);
            expect(Model.prototype.save).toHaveBeenCalled();
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('write missing spec', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "swaggerUiUrl": "https://petstore.swagger.io",
                "displayTitle": "Pet Store",
                "displayDescription": "Pet store swagger"
            };
            const result = await spec.writeSpec(data, true);
            fail(result);
        } catch (error) {
            expect(error.message).toBe('the OpenAPI URI did not point to a valid OpenAPI specification');
        }
    });

    it('write missing title', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "apiSpecJsonUri": "https://petstore.swagger.io/v2/swagger.json",
                "swaggerUiUrl": "https://petstore.swagger.io",
                "displayDescription": "Pet store swagger"
            };
            const result = await spec.writeSpec(data, true);
            fail(result);
        } catch (error) {
            expect(error.message).toBe('api-spec-pointers validation failed: displayTitle: Path `displayTitle` is required.');
        }
    });

    it('write missing description', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "apiSpecJsonUri": "https://petstore.swagger.io/v2/swagger.json",
                "swaggerUiUrl": "https://petstore.swagger.io",
                "displayTitle": "Pet store"
            };
            const result = await spec.writeSpec(data, true);
            expect(Model.prototype.save).toHaveBeenCalled();
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('write and error when swagger is wrong', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "apiSpecJsonUri": "https://petstore.swagger.io/v3/swagger.json", //there is no v3 on this url
                "swaggerUiUrl": "https://petstore.swagger.io",
                "displayTitle": "Pet store",
                "displayDescription": "Pet stores are us"
            };
            const result = await spec.writeSpec(data, true);
            fail(result);
        } catch (error) {
            expect(error.message).toBe('the OpenAPI URI did not point to a valid OpenAPI specification');
        }
    });

    it('write and error when swagger ui does not return 200', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'save');
            const data = {
                "apiSpecJsonUri": "https://petstore.swagger.io/v2/swagger.json",
                "swaggerUiUrl": "https://petstore.swagger.io/v3/swagger.json", // this doesn't exist
                "displayTitle": "Pet store",
                "displayDescription": "Pet stores are us"
            };
            const result = await spec.writeSpec(data, true);
            fail(result);
        } catch (error) {
            expect(error.message).toBe('the swagger UI link did not load as expected');
        }
    });

    it('get one spec', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.id = expected._id;
            delete expected._id;
            mockingoose(Model).toReturn(oneSpec, 'findOne');
            const result = await spec.getSpec(oneSpec._id);
            expect(Model.Query.prototype.findOne).toHaveBeenCalledWith({ "_id": oneSpec._id }, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('get specs', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(multiSpecs));
            expected[0].id = expected[0]._id;
            expected[1].id = expected[1]._id;
            delete expected[0]._id;
            delete expected[1]._id;
            mockingoose(Model).toReturn(multiSpecs, 'find');
            const q = { $filter: "displayTitle eq 'Pet Store'" };
            const result = await spec.getSpecs(q);
            expect(Model.Query.prototype.find).toHaveBeenCalledWith({ displayTitle: 'Pet Store' }, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('patch spec', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneSpec));
            expected.displayTitle = "new title";

            mockingoose(Model).toReturn(expected, 'findOneAndUpdate');
            mockingoose(Model).toReturn(oneSpec, 'findOne');
            expected.id = expected._id;
            delete expected._id;
            const update = [
                {
                    "op":"replace",
                    "path":"/displayTitle",
                    "value": expected.displayTitle
                }
            ];
            const result = await spec.patchSpec(oneSpec._id, update);
            expect(Model.Query.prototype.findOne).toHaveBeenCalledWith({ "_id": oneSpec._id }, undefined);
            expect(Model.Query.prototype.findOneAndUpdate).toHaveBeenCalledWith({ "_id": oneSpec._id }, expected, { "new": true, "overwrite": true}, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res.message).toBe(expected.message);
        } catch (error) {
            fail(error);
        }
    });
});