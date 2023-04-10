const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');

const app = express();

const classes = require('./routes/api/classes');
const login = require('./routes/api/login');
const users = require('./routes/api/user');
const booker = require('./routes/api/book');

// Connect Database
connectDB();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/classes', classes);
app.use('/api/book', booker);
app.use('/api/login', login);
app.use('/api/user', users);


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
