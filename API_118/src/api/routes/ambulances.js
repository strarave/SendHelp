const express = require('express');
const ambulances = require('../services/ambulances');

const router = new express.Router();


/**
 * Fetch the number of ambulances in a specific location.
 */
router.get('/:locationId', async (req, res, next) => {
  let params = req.params.locationId;
  try {
    const result = await ambulances.ambulancesByLocationid(params);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
