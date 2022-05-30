const express = require('express');
const services = require('../services');

const router = new express.Router();


/**
 * Get patient data
 */
router.get('/:patient', async (req, res, next) => {
  let patient = req.params.patient;
  try {
    const result = await services.getPatient(patient);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Add a patient
 */
router.post('/', async (req, res, next) => {
  let body = req.body;
  console.log(body);
  try {
    const result = await services.addPatient(body);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
