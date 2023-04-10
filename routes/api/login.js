const express = require("express");
const router = express.Router();

const Login = require("../../models/Login");
const Class = require("../../models/Class");

//Gets login credentials from the database
// router.get('/auth', (req, res) => {
//   Login.find()
//     .then((login) => res.json(login))
//     .catch((err) =>
//       res.status(404).json({ no_login_found: "No Login Data found" })
//     );
// });

router.get('/auth', (req, res) => {
  Login.find()
    .then((login) => res.json(login))
    .catch((err) =>
      res.status(404).json({ no_login_found: "No Login Data found" })
    );
});

router.get('/test', (req, res) => res.send('Test is successful.'));


module.exports = router;
