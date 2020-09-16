const express = require('express');
const router = express.Router();
const Users = require('../../Modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserController = require('../../Controllers/UserController');

const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  UserController.SignIn
);
module.exports = router;
