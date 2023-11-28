const express = require('express');
const { Playbook, Job } = require('../models');
const yaml = require('js-yaml');
const job = require('../models/job');
const initializeSequelize = require('../models');

const router = express.Router();

// Route to create a new playbook with associated jobs
router.post('/', async (req, res) => {
  try {
    // Parse YAML content from the request body
    console.log(req.body)

    const { name, jobs } = req.body.playbook;

    console.log(name, jobs)

    const playbook = await Playbook.create({
      name: name,
    });

    const playbookId = playbook.id;

    const jobsWithPlaybookId = jobs.map(job => ({ ...job, PlaybookId: playbookId }));

    const createdJobs = await Job.bulkCreate(jobsWithPlaybookId);

    res.status(201).json({
      message: 'Playbook created successfully',
      playbook: playbook.toJSON(),
      jobs: createdJobs.map(job => job.toJSON()),
    });
  } catch (error) {
    console.error('Error creating playbook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all playbooks with associated jobs
router.get('/', async (req, res) => {
  try { 
    const playbooks = await Playbook.findAll({ include: Job });

    res.status(200).json(playbooks);
  } catch (error) {
    console.error('Error getting playbooks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
