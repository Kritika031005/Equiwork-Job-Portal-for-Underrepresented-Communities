const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/post-job', jobController.postJob);
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:id', jobController.getJobById);


module.exports = router;
