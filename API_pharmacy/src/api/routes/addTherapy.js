const express = require('express');
const addTherapy = require('../services/addTherapy');

const router = new express.Router();


/**
 * Add or remove a drug / set of drugs to a patient record
 */
router.post('/', async (req, res, next) => {
  let params = req.body;
  try {
    const result = await addTherapy.postAddTherapy(params);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
