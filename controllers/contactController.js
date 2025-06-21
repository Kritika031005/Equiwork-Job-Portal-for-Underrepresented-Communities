const db = require('../db');

exports.submitContact = (req, res) => {
  const { name, email, query_type, message } = req.body;
  const sql = 'INSERT INTO contacts (name, email, query_type, message) VALUES (?, ?, ?, ?)';

  db.query(sql, [name, email, query_type, message], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to save message.' });
    res.json({ message: 'Message submitted successfully!' });
  });
};
