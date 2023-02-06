const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const member = require('./src/api/routes/memberRoute')
const badge = require('./src/api/routes/badgeRoute')
const task = require('./src/api/routes/taskRoute')
const notification = require('./src/api/routes/notificationRoute')
require('dotenv').config();

const connectDB = require('./src/config/db_init.js')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

connectDB();

//Main Route
app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});


//call routes
app.use('/member', member)
app.use('/badge', badge)
app.use('/task', task)
app.use('/notification', notification)




app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});




// if the route is not found
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
