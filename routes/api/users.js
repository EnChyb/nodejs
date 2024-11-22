const express = require('express');
const router = express.Router();
const { signupUser, loginUser, logoutUser, currentUser, updateSubscription } = require('../../controllers/users/auth')

const validateUser = require('../../middlewares/validateUser');
const authMiddleware = require('../../middlewares/jwt')

router.post('/signup', validateUser, signupUser);
router.post('/login', loginUser);
router.get('/logout', authMiddleware, logoutUser);
router.get('/current', authMiddleware, currentUser);
router.patch('/', authMiddleware, updateSubscription)

module.exports = router