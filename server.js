const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applications');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// const corsOptions = {
//   origin: process.env.CORS_ORIGIN.split(','),
//   credentials: true
// };
const allowedOrigins = process.env.CORS_ORIGIN.split(',');

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (e.g., curl or mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.static(path.join(__dirname, '../srp-job-portal')));
app.use('/uploads/resumes', express.static(path.join(__dirname, 'uploads/resumes')));

app.use('/api', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
