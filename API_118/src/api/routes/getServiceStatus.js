const express = require('express');
const getServiceStatus = require('../services/getServiceStatus');

const router = new express.Router();


/**
 * Check if the service is active.
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await getServiceStatus.getGetServiceStatus(options);
    res.send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
