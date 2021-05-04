const { authController } = require('../controllers/auth.controller');
const SchemaValidator = require('../middleware/schema.validator');
const schemas = require('../schema/schema');

// const { authController } = require('../controllers/auth.controller');
const router = require('express').Router();
// register every route here
router.get('/auth/user',authController);
router.get('/auth/login', authController);
router.post('/auth/register',SchemaValidator(schemas['user'],"body"), authController);
router.get('/auth/refresh', authController);
// router.get('/category',)



module.exports =router;