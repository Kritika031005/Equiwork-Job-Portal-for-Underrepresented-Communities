const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
  const { fname, lname, aadhaar, email, password, phone, interest, message } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error checking user' });
    if (results.length > 0) return res.status(400).json({ message: 'Email already registered' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Failed to hash password' });

      const insertQuery = `
        INSERT INTO users (first_name, last_name, aadhaar, email, password, phone, interest, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(insertQuery, [fname, lname, aadhaar, email, hashedPassword, phone, interest, message], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to register user' });
        res.status(200).json({ message: 'Registration successful!' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    req.session.user = { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email };
    res.json({ message: 'Login successful', user: req.session.user });
  });
};

exports.getCurrentUser = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  res.json({ user: req.session.user });
};


// exports.employerLogin = (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM employers WHERE email = ?', [email], (err, results) => {
//     if (err) return res.status(500).json({ success: false, message: 'Database error' });
//     if (results.length === 0 || password !== results[0].password)
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });

//     req.session.employer = { id: results[0].id, email: results[0].email };
//     res.status(200).json({ success: true, message: 'Login successful', employer: req.session.employer });
//   });
// };

// exports.employerLogin = (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM employers WHERE email = ?', [email], (err, results) => {
//     if (err) return res.status(500).json({ success: false, message: 'Database error' });

//     if (results.length === 0 || password !== results[0].password)
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });

//     const employerData = {
//       id: results[0].id,
//       email: results[0].email,
//       companyName: results[0].company_name  // assumes `company_name` is in your employers table
//     };

//     req.session.employer = employerData;

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       employer: employerData // ✅ So frontend gets { email, id, companyName }
//     });
//   });
// };
exports.employerLogin = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM employers WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (results.length === 0 || password !== results[0].password)
      return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const employerData = {
      id: results[0].id,
      email: results[0].email,
      companyName: results[0].company_name  // assumes `company_name` is in your employers table
    };

    req.session.employer = employerData;
    console.log('Employer session:', req.session.employer); // Add this line to log session info

    res.status(200).json({
      success: true,
      message: 'Login successful',
      employer: employerData // ✅ So frontend gets { email, id, companyName }
    });
  });
};



exports.employerLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
};
