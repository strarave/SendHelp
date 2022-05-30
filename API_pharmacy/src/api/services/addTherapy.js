const ServerError = require('../../lib/error');
module.exports.postAddTherapy = async (options) => {
  let FC = options[0].userFiscalCode;
  let drug = options[0].drugName;
  let dosage = options[0].dosagePrescribed;
  let prescription = options[0].action;
  return {
    status: 200,
    data: `${prescription} ${dosage} of ${drug} to user with FC '${FC}'`
  };
};

