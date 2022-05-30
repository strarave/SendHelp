const ServerError = require('../../lib/error');
module.exports.getGetServiceStatus = async (options) => {
  return {
    status: 200,
    data: 'getGetServiceStatus ok!'
  };
};

