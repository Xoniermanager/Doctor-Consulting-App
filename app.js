const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// middleware for errors
const errorMiddleware = require('./middleware/error');
// routes import 
const user = require('./routes/userRoute');
app.use('/api',user);

app.use(errorMiddleware);
module.exports = app;
