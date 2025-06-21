const db = require('../db');

exports.postJob = (req, res) => {
  const {
    title,
    location,
    salary,
    jobType,
    industry,
    category,  // Expecting array from checkboxes
    contactEmail,
    description
  } = req.body;

  const categoryStr = Array.isArray(category) ? category.join(', ') : category;

  const query = `
    INSERT INTO jobs (title, location, salary, job_type, industry, category, contact_email, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [title, location, salary, jobType, industry, categoryStr, contactEmail, description], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.status(201).json({ success: true, message: "Job posted successfully", jobId: result.insertId });
  });
};
exports.getAllJobs = (req, res) => {
    const query = 'SELECT * FROM jobs';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching jobs:', err);
            return res.status(500).json({ success: false, message: 'Failed to retrieve jobs.' });
        }
        res.status(200).json({ success: true, jobs: results });
    });
};

exports.getJobById = (req, res) => {
  const jobId = req.params.id;

  const query = `
    SELECT jobs.*, employers.company_description, employers.email AS employer_email
    FROM jobs
    JOIN employers ON jobs.contact_email = employers.email
    WHERE jobs.id = ?
  `;

  db.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("Error fetching job by ID:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      job: results[0],
      employers: {
        company_description: results[0].company_description,
        email: results[0].employer_email
      }
    });
  });
};