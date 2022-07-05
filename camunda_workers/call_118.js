const { Client, logger, Variables } = require('camunda-external-task-client-js');
const RESTClient = require('node-rest-client').Client;
const open = require('open');

const config = { baseUrl: 'http://camunda:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

const restClient = new RESTClient();

client.subscribe('call_118', async function ({ task, taskService }) {
  // Get patient data
  const patientName = task.variables.get('patientName');
  const patientSurname = task.variables.get('patientSurname');
  const patientAddress = task.variables.get('patientAddress');

  console.log(`Patient ${patientName} ${patientSurname} - ${patientAddress}`);

  // Get prognosis data
  const doctorId = task.variables.get('doctorId');
  const emergencyLevel = task.variables.get('emergencyLevel');
  const reportedSymptoms = task.variables.get('reportedSymptoms');
  const suggestedFirstAid = task.variables.get('suggestedFirstAid');

  console.log(`Emergency details: ${emergencyLevel} risk`);

  var args = {
    headers: { "Content-Type": "application/json" },
    data: {
      doctorId: doctorId,
      patientData: {
        patientName: patientName,
        patientSurname: patientSurname,
        patientAddress: patientAddress
      },
      emergencyDetails: {
        emergencyLevel: emergencyLevel,
        reportedSymptoms: [],
        suggestedFirstAid: suggestedFirstAid
      }
    }
  };

  processVariables = new Variables();
  processVariables.set("actionDetails", `Send ambulance to patient ${patientName} ${patientSurname}, address: ${patientAddress}`);

  restClient.post('http://api-118:3001/ambulanceRequest', args, function (data, response) {
    console.log(`Response received: ${data}, ${response}`);

    processVariables.set("actionResult", data);
    taskService.complete(task, processVariables, new Variables());
  })
});

