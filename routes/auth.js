const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controller/auth');
const auth = require('../middleware/is-auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
  ],
  authController.signup,
);

router.put('/login', authController.login);

router.get('/auth-endpoint', auth, (request, response) => {
  response.json({ message: 'You are authorized to access me', user: User });
});

module.exports = router;
