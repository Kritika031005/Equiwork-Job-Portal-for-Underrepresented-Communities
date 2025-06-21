const db = require('../db');
const path = require('path');

exports.submitApplication = (req, res) => {
  const { jobId, name, email, coverLetter } = req.body;
  const resume = req.file ? req.file.filename : null;

  if (!jobId || !name || !email || !resume) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  const sql = `
    INSERT INTO applications (job_id, name, email, resume, cover_letter)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [jobId, name, email, resume, coverLetter || null], (err, result) => {
    if (err) {
      console.error('Error saving application:', err);
      return res.status(500).json({ message: 'Server error. Try again later.' });
    }

    res.status(201).json({ message: 'Application submitted successfully!' });
  });
};
