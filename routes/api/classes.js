const express = require('express');
const router = express.Router();

// Load Class model
const Class = require('../../models/Class');

// @route GET api/yoga_classs/test
// @description tests yoga_classs route
// @access Public
router.get('/test', (req, res) => res.send('yoga_class route testing!'));

// @route GET api/yoga_classs
// @description Get all yoga_classs
// @access Public
router.get('/', (req, res) => {
  Class.find()
    .then((yoga_classs) => res.json(yoga_classs))
    .catch((err) => res.status(404).json({ noyoga_classsfound: 'No Classs found' }));
});

// @route GET api/yoga_classs/:id
// @description Get single yoga_class by id
// @access Public
router.get('/:id', (req, res) => {
  Class.findById(req.params.id)
    .then((yoga_class) => res.json(yoga_class))
    .catch((err) => res.status(404).json({ noyoga_classfound: 'No Class found' }));
});

// @route GET api/yoga_classs
// @description add/save yoga_class
// @access Public
router.post('/', (req, res) => {
  Class.create(req.body)
    .then((yoga_class) => res.json({ msg: 'Class added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this yoga_class' }));
});

// @route GET api/yoga_classs/:id
// @description Update yoga_class
// @access Public
router.put('/:id', (req, res) => {
  Class.findByIdAndUpdate(req.params.id, req.body)
    .then((yoga_class) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/yoga_classs/:id
// @description Delete yoga_class by id
// @access Public
router.delete('/:id', (req, res) => {
  Class.findByIdAndRemove(req.params.id, req.body)
    .then((yoga_class) => res.json({ mgs: 'Class entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a yoga_class' }));
});

// //Gets login credentials from the database
// router.get('/login', (req, res) => {
//   Login.find()
//     .then((login) => res.json(login))
//     .catch((err) => res.status(404).json({ no_login_found: 'No Login Data found' }));
// });

module.exports = router;
