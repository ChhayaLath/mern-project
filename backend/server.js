const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax' 
  }
}));


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
