import '@babel/register';
import "regenerator-runtime/runtime";
jest.mock('express-openapi-validate');
import auth from '../src/auth/auth';
import mockingoose from "mockingoose/lib/index";
import bcrypt from "bcryptjs";
import Model from "../src/api/users/model";

const oneUser = {
    "created": "2020-03-23T02:11:49.000Z",
    "email": "test@example.com",
    "password": "replacewithhash",
    "_id": "4dd31c2c-be8b-4f96-8d30-40ce1b0a42fb"
};

describe('Auth middleware tests', () => {

    test('make sure isAuthenticated works as expected', async () => {
        try {
            const plainTextPassword = 'xyz098';
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(plainTextPassword, salt);
            const myUser = {
                ...JSON.parse(JSON.stringify(oneUser))
            };
            myUser.password = hashedPassword;
            mockingoose(Model).toReturn(myUser, 'findOne');
            const codedAuth = Buffer.from(`${myUser.email}:${plainTextPassword}`).toString('base64');
            const req = { path: "/api/specs", headers: { authorization: `basic ${codedAuth}`}, logIn: jest.fn() }, res = { sendStatus: jest.fn(), header: jest.fn() }, next = jest.fn();
            const user = await (((req, res, next) => {
                return new Promise((resolve, reject) => {
                    auth.passport.authenticate('basic', { session: false }, (err, user, info) => {
                        if (err) reject(err);
                        resolve(user);
                    })(req, res, next);
                })
            })(req, res, next));
            expect(user._id).toBe(myUser._id);
            expect(user.password).toBe(myUser.password);
            expect(user.email).toBe(myUser.email);
            const cleaned = JSON.parse(JSON.stringify(user));
            delete myUser.password;
            myUser.id = myUser._id;
            delete myUser._id;
            expect(cleaned).toMatchObject(myUser);
        } catch (error) {
            fail(error);
        }
    });

    test('make sure isAuthenticated fails with wrong password', async () => {
        try {
            const plainTextPassword = 'xyz098';
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(plainTextPassword, salt);
            const myUser = {
                ...JSON.parse(JSON.stringify(oneUser))
            };
            myUser.password = hashedPassword;
            mockingoose(Model).toReturn(myUser, 'findOne');
            const codedAuth = Buffer.from(`${myUser.email}:wrong`).toString('base64');
            const req = { path: "/api/specs", headers: { authorization: `basic ${codedAuth}`}, logIn: jest.fn() }, res = { sendStatus: jest.fn(), header: jest.fn() }, next = jest.fn();
            const user = await (((req, res, next) => {
                return new Promise((resolve, reject) => {
                    auth.passport.authenticate('basic', { session: false }, (err, user, info) => {
                        if (err) reject(err);
                        resolve(user);
                    })(req, res, next);
                })
            })(req, res, next));
            expect(user).toBe(false);
        } catch (error) {
            fail(err)
        }
    });

});