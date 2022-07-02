const ServerError = require('../../lib/error');
module.exports.postambulanceRequest = async (options) => {
   return {
      status: 200,
      data: 'sending ambulance to ' + options.patientData.patientAddress
   };
};

