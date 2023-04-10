const express = require("express");
const router = express.Router();

// Load Class model
const Booker = require("../../models/Booker");

router.get('/test', (req, res) => res.send('Booking route testing!'));

router.get("/", (req, res) => {
  Booker.find()
    .then((yoga_classs) => res.json(yoga_classs))
    .catch((err) =>
      res.status(404).json({ noyoga_classsfound: "No Bookings found" })
    );
});

// router.post('/', async (req, res) => {
//   Booker.create(req.body)
//     .then((yoga_class) => res.json({ msg: "Class added successfully" }))
//     .catch((err) =>
//       res.status(400).json({ error: "Unable to add this yoga_class" })
//     );
// });

router.post('/', (req, res) => {
  Booker.create(req.body)
    .then((yoga_class) => res.json({ msg: "Class added successfully", bookingID: yoga_class.id }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this yoga_class" })
    );
  // res.send("Dummy data...");
});

router.post("/createbooking", (req, res) => {
  Booker.create(req.body)
    .then((yoga_class) => res.send(res.param.id))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this yoga_class" })
    );
});

router.get('/:id', (req, res) => {
  Booker.findById(req.params.id)
    .then((yoga_class) => res.json(yoga_class))
    .catch((err) => res.status(404).json({ noyoga_classfound: 'No Class found' }));
});

module.exports = router;
