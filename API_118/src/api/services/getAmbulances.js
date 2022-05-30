const ServerError = require('../../lib/error');
module.exports.getGetAmbulancesByLocationid = async (locationId) => {
  let ambulancesNumber = 0;
  switch(locationId) {
    case 'Milano':
      ambulancesNumber = 100;
      break;

    case 'Monza':
      ambulancesNumber = 10;
      break;
  }
  return {
    status: 200,
    data: ambulancesNumber
  };
};

