const express = require('express');
const glance = require('../services/glance');

const router = new express.Router();


/**
 * Basic information about the pharmacy
 */
router.get('/:pharmacyId', async (req, res, next) => {
  let pharmacyId = req.params.pharmacyId;
  try {
    const result = await glance.getGlanceByPharmacyid(pharmacyId);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
