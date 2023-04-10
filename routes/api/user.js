
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const store = require("../../config/default.json");


router.get('/', (req, res) => {
    User.find()
      .then((yoga_classs) => res.json(yoga_classs))
      .catch((err) => res.status(404).json({ noyoga_classsfound: 'No Classs found' }));
  });

// Route to log in a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
    // res.send("Test");
  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user is not found, return error
    if (!user) {
    //   res.status(400).json({ msg: 'Invalid credentials' });
        // res.send("Invalid credentials");
        throw "Invalid credentials";
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    // If password is incorrect, return error
    if (!isMatch) {
    //   res.status(400).json({ msg: 'Invalid credentials' });
    res.send("Invalid credentials");
    throw "Invalid credentials";
    }

    // Create JWT
    // const payload = {
    //   user: {
    //     id: 1,
    //   },
    // };

    const token = jwt.sign({name: "JUBE"}, store.JWT_SECRET, { expiresIn: '1h' });

    // // Return JWT
    res.json({ token });
    // res.send("Dummy Data...");
  } catch (err) {
    // console.error(err.message);
    // res.status(500).send('Server error');
    res.send("Registration Failed. Reason: " + err.message);
  }
});

// Route to register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
//   res.send("Dummy Response");


  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
    //   return res.status(400).json({ msg: 'User already exists' });
        // res.send("The user already exists");
        throw "The user already exists";
    }

    // Create new user
    user = new User({
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();
    // User.create(user);

    // Create JWT
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // const token = jwt.sign({name: "JUBE"}, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return JWT
    // res.json({ token });

    // res.send("Dummy Response");
  } catch (err) {
    // console.error(err.message);
    // res.status(500).send('Server error');
    res.send("Registration failed");
  }
});

// Route to get user information
// router.get('/info', authMiddleware, async (req, res) => {
//   try {
//     // Get user by ID
//     const user = await User.findById(req.user.id).select('-password');

//     // If user is not found, return error
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Return user information
//     res.json({ user });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Middleware to authenticate user
// function authMiddleware(req, res, next) {
//   // Get JWT from header
//   const token = req.header('x-auth-token');

//   // If JWT is not found, return error
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     // Verify JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Set user ID in request object
//     req.user = decoded.user;

//     // Call next middleware
//     next();
//   } catch (err) {
//     res.status(401).json({ msg

// POST /api/user/register
// Register a new user
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate user input
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Please enter all fields' });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Create a new user
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();

//     // Generate a token for the new user
//     const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

//     res.json({
//       token,
//       user: {
//         id: savedUser._id,
//         email: savedUser.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // GET /api/user/info
// // Get user info for authenticated user
// router.get('/info', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json({ user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

module.exports = router;
