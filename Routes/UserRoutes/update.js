const express = require('express');
const router = express.Router();
const Users = require('../../Modals/user');
const bcrypt = require('bcryptjs');
const auth = require('../../Middleware/Auth');

router.put('/', auth, async (req, res) => {
  try {
    const user = await Users.findOne(req.user.id);
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }
    user.location = req.body.location;
    await user.save();
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
