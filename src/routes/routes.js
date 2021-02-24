const { authController } = require('../controllers/auth.controller');

// const { authController } = require('../controllers/auth.controller');
const router = require('express').Router();
// register every route here
router.get('/auth/user', authController);
router.get('/auth/login', authController);
router.post('/auth/register', authController);
router.get('/auth/refresh', authController);



module.exports =router;