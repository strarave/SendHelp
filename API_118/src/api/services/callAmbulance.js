const ServerError = require('../../lib/error');
module.exports.postCallAmbulance = async (options) => {
   return {
      status: 200,
      data: 'sending ambulance to ' + options.patientData.patientAddress
   };
};

