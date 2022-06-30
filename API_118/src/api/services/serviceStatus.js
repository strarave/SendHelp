const ServerError = require('../../lib/error');
module.exports.serviceStatus = async (options) => {
  return {
    status: 200,
    data: 'serviceStatus ok!'
  };
};

