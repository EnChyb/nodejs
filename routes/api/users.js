const express = require('express');
const router = express.Router();
const {
    signupUser,
    loginUser,
    logoutUser,
    currentUser,
    updateSubscription,
    updateAvatars } = require('../../controllers/users/auth')

const {
    validateUser,
    validateEmail } = require('../../middlewares/validateUser');
const authMiddleware = require('../../middlewares/jwt');
const {
    uploadMiddleware,
    validateAndTransformAvatar } = require('../../middlewares/avatarUpload');
const verifyEmail = require('../../controllers/users/verifyEmail')
const verifyUser = require("../../middlewares/verifyUser");
const verifyUserToken = require('../../controllers/users/verifyUserToken');

router.post('/signup', validateUser, signupUser);
router.post('/login', verifyUser, loginUser);
router.get('/logout', authMiddleware, logoutUser);
router.get('/current', authMiddleware, currentUser);
router.patch('/', authMiddleware, updateSubscription);
router.patch('/avatars',
    authMiddleware,
    uploadMiddleware.single("avatar"),
    validateAndTransformAvatar,
    updateAvatars);
router.get('/verify/:verificationToken', verifyUserToken)
router.post('/verify', validateEmail, verifyEmail)

module.exports = router