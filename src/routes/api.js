import express from 'express';
import settings from '../api/settings/api';
import users from '../api/users/api';
import oaSpecs from '../api/specs/api';
import m from '../middleware';
const router = express.Router();
const p = require('../../package.json');
const date = new Date();

router.get('/version', (req, res) => {
    res.json( {
        data: {
            api: p.name,
            version: p.version,
            baseURL: '/api',
            copyright: `Copyright (c) ${date.getFullYear()} ${p.author}`,
            license: p.license
        }
    });
});

// System
router.get('/health', (req, res) => {
    res.json({data: {server: 'running'}});
});

// todo auth and schema check
// Settings
router.get('/settings', m.isAuthenticated, settings.getSettings);

// Specs
router.post('/schema', [m.isAuthenticated, m.schemaCheck], oaSpecs.writeSpec);
router.get('/schema', oaSpecs.getSpecs);
router.get('/schema/:id', oaSpecs.getSpec);
router.patch('/schema/:id', [m.isAuthenticated, m.schemaCheck], oaSpecs.patchSpec);
router.delete('/schema/:id', m.isAuthenticated, oaSpecs.deleteSpec);

// User
router.post('/users', [m.schemaCheck], users.writeUser);
router.get('/users', [m.isAuthenticated, m.schemaCheck], users.getUsers);
router.get('/users/:id', [m.isAuthenticated, m.schemaCheck], users.getUser);
router.delete('/users/:id', [m.isAuthenticated, m.schemaCheck], users.deleteUser);

module.exports = router;
