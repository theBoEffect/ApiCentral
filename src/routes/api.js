import express from 'express';
import log from '../api/logging/api';
import settings from '../api/settings/api';
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

// Log and Health
router.get('/logs', log.getLogs);
router.get('/logs/:id', log.getLog);
router.post('/logs', [m.schemaCheck], log.writeLog);
router.patch('/logs/:id', [m.schemaCheck], log.patchLog); //For Example Only

router.get('/health', (req, res) => {
    res.json({data: {server: 'running'}});
});

// todo auth and schema check
// Settings

router.put('/settings', settings.setSettings);
router.get('/settings', settings.getSettings);

/*
// Specs

router.post('/schema', schema.writeSchema);
router.get('/schema', schema.getSchemas);
router.get('/schema/:id', schema.getSchema);
router.patch('/schema/:id', schema.patchSchema);
router.delete('/schema/:id', schema.deleteSchema);

*/
module.exports = router;
