import '@babel/register';
import "regenerator-runtime/runtime";
import mockingoose from 'mockingoose';
import Model from '../src/api/users/model';
import user from '../src/api/users/users';
import bcrypt from "bcryptjs";

const oneUser = {
    "created": "2020-03-23T02:11:49.000Z",
    "email": "test@example.com",
    "password": "examplehashed123abc",
    "_id": "4dd31c2c-be8b-4f96-8d30-40ce1b0a42fb"
};

const multiUsers = [
    {
        "created": "2020-03-23T02:11:49.000Z",
        "email": "test@example.com",
        "password": "examplehashed123abc",
        "_id": "4dd31c2c-be8b-4f96-8d30-40ce1b0a42fb"
    },
    {
        "created": "2020-04-23T02:11:49.000Z",
        "email": "user@example.com",
        "password": "examplehashed123abc",
        "_id": "4dd31c2c-be8b-4f96-8d30-40ce1b0a42ec"
    }
];

describe('User DAL tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockingoose.resetAll();
        Model.Query.prototype.findOne.mockClear();
    });

    it('write a user - password is not returned', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneUser));
            expected.id = expected._id;
            delete expected.password;
            delete expected._id;
            mockingoose(Model).toReturn(oneUser, 'save');
            const data = {
                "email": "test@example.com",
                "password": "098xyz"
            };
            const result = await user.writeUser(data, true);
            expect(Model.prototype.save).toHaveBeenCalled();
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('write missing email', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneUser));
            expected.id = expected._id;
            delete expected.password;
            delete expected._id;
            mockingoose(Model).toReturn(oneUser, 'save');
            const data = {
                "password": "098xyz"
            };
            const result = await user.writeUser(data, true);
            fail(result);
        } catch (error) {
            expect(error.message).toBe('local-users validation failed: email: Path `email` is required.');
        }
    });

    it('write missing password', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneUser));
            expected.id = expected._id;
            delete expected.password;
            delete expected._id;
            mockingoose(Model).toReturn(oneUser, 'save');
            const data = {
                "email": "test@example.com"
            };
            const result = await user.writeUser(data, true);
            fail(result);
        } catch (error) {
            expect(error.message).toBe('local-users validation failed: password: Path `password` is required.');
        }
    });


    it('get one user', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneUser));
            expected.id = expected._id;
            delete expected._id;
            delete expected.password;
            mockingoose(Model).toReturn(oneUser, 'findOne');
            const result = await user.getUser(oneUser._id);
            expect(Model.Query.prototype.findOne).toHaveBeenCalledWith({ "_id": oneUser._id }, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });


    it('get users', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(multiUsers));
            expected[0].id = expected[0]._id;
            expected[1].id = expected[1]._id;
            delete expected[0]._id;
            delete expected[1]._id;
            delete expected[0].password;
            delete expected[1].password;
            mockingoose(Model).toReturn(multiUsers, 'find');
            const q = {};
            const result = await user.getUsers(q);
            expect(Model.Query.prototype.find).toHaveBeenCalledWith({}, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('delete one user', async () => {
        try {
            const expected = JSON.parse(JSON.stringify(oneUser));
            expected.id = expected._id;
            delete expected._id;
            delete expected.password;
            mockingoose(Model).toReturn(oneUser, 'findOneAndRemove');
            const result = await user.deleteUser(oneUser._id);
            expect(Model.Query.prototype.findOneAndRemove).toHaveBeenCalledWith({ "_id": oneUser._id }, undefined, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);
        } catch (error) {
            fail(error);
        }
    });

    it('check user lookup', async () => {
        try {
            const plainTextPassword = 'xyz098';
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(plainTextPassword, salt);
            const myUser = JSON.parse(JSON.stringify(oneUser));
            myUser.password = hashedPassword;
            const expected = JSON.parse(JSON.stringify(myUser));
            expected.id = expected._id;
            delete expected._id;
            delete expected.password;
            mockingoose(Model).toReturn(myUser, 'findOne');
            const result = await user.getUser(myUser._id);
            expect(Model.Query.prototype.findOne).toHaveBeenCalledWith({ "_id": myUser._id }, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);

            const lookup = await user.lookup(expected.email, plainTextPassword);
            expect(lookup.email).toBe(myUser.email);
            expect(lookup._id).toBe(myUser._id);
            expect(lookup.password).toBe(hashedPassword);
        } catch (error) {
            fail(error);
        }
    });

    it('check user lookup with bad password', async () => {
        try {
            const plainTextPassword = 'xyz098';
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(plainTextPassword, salt);
            const myUser = JSON.parse(JSON.stringify(oneUser));
            myUser.password = hashedPassword;
            const expected = JSON.parse(JSON.stringify(myUser));
            expected.id = expected._id;
            delete expected._id;
            delete expected.password;
            mockingoose(Model).toReturn(myUser, 'findOne');
            const result = await user.getUser(myUser._id);
            expect(Model.Query.prototype.findOne).toHaveBeenCalledWith({ "_id": myUser._id }, undefined);
            const res = JSON.parse(JSON.stringify(result));
            expect(res).toMatchObject(expected);

            const lookup = await user.lookup(expected.email, 'wrong');
            fail(lookup);
        } catch (error) {
            expect(error.message).toBe('wrong password');
        }
    });

});