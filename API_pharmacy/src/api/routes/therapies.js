const express = require('express');
const services = require('../services');

const router = new express.Router();

/**
 * Get therapies
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await services.getTherapies();
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Add a therapy
 */
router.post('/', async (req, res, next) => {
  let body = req.body;
  try {
    const result = await services.addTherapy(body);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a therapy
 */
router.post('/:therapyId', async (req, res, next) => {
  let params = req.body;
  let therapyId = req.params.therapyId;
  try {
    const result = await services.updateTherapy(therapyId, params);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a therapy
 */
router.delete('/:therapyId', async (req, res, next) => {
  let therapyId = req.params.therapyId;
  try {
    const result = await services.deleteTherapy(therapyId);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
