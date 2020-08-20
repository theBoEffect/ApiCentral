import { OpenApiValidator } from 'express-openapi-validate';
import Boom from '@hapi/boom';
import handleErrors from './customErrorHandler';
import { sayMiddleware } from './say';
import swag from './swagger';
import authorizer from './auth/auth';
const schema = new OpenApiValidator(swag);

export default {
    cores (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, DELETE, PUT, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, api_key, Authorization');
        next();
    },
    catch404 (req, res, next) {
        // Since this serves both API and UI, we want to make sure UI redirects to root on unknown requests while api returns 404
        const pathParts = req.path.split('/');
        if(pathParts[1]==='api') return next(handleErrors.catch404());
        return res.redirect('/');
    },
    async catchErrors (err, req, res, next) {
        try {
            const error = await handleErrors.parse(err);
            return res.respond(error);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }

    },
    responseIntercept: sayMiddleware.responseIntercept,
    async schemaCheck(req, res, next) {
        try {
            let path  = req.route.path;
            await Promise.all(Object.keys(req.params).map((p)=>{
                path = path.replace(`:${p}`, `{${p}}`);
            }));
            schema.validate(req.method.toString().toLowerCase(), path.toLowerCase())(req, res, next);
        } catch (error) {
            next(Boom.expectationFailed('OpenAPI Schema Validation'));
        }
    },
    isAuthenticated: authorizer.isAuthenticated
}