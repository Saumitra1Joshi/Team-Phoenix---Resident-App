const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Users = require('../../Modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//route to sign-up

router.post(
  '/',
  [
    check('name', 'Please include a Valid name').isLength({
      min: 3,
    }),
    check('username', 'please include a valid name').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check(
      'password',
      'please enter a passowrd with 8 or more characters'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, password } = req.body;
    try {
      //See if user exists
      let user = await Users.findOne({ email });
      //if user exits
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exists' }] });
      }
      //If user doesn't exists
      user = new Users({
        name,
        username,
        email,
        password,
      });

      //password encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //after saving lets return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 1209600,
        },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
