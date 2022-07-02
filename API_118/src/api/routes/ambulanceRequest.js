const express = require('express');
const ambulanceRequest = require('../services/ambulanceRequest');

const router = new express.Router();

/**
 * Request and ambulance, given the address, the patient 
 * conditions (so the symptoms and type of emergency) and 
 * generalities and the doctor ID, which can also represnt the 
 * emergency issuing agent. The doctor can also specify 
 * additional notes, for example related to first aid actions.
 */
router.post('/', async (req, res, next) => {
  let params = req.body;

  try {
    const result = await ambulanceRequest.postambulanceRequest(params);
    res.send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
