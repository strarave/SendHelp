const express = require('express');
const serviceStatus = require('../services/serviceStatus');

const router = new express.Router();


/**
 * Check if the service is active.
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await serviceStatus.serviceStatus(options);
    res.send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
