const { Client, logger, Variables } = require('camunda-external-task-client-js');
const RESTClient = require('node-rest-client').Client;
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
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
  const emergencyDetails = task.variables.get('prognosis')['emergencyDetails'];

  console.log(`Emergency details: ${emergencyDetails}`);

  var args = {
    headers: { "Content-Type": "application/json" },
    body: {
      "doctorId": doctorId,
      "patientData": {
        "patientName": patientName,
        "patientSurname": patientSurname,
        "patientAddress": patientAddress
      },
      "emergencyDetails": emergencyDetails
    }
  };

  processVariables = new Variables();

  restClient.post('http://localhost:3000/ambulance-requests', args, function (data, response) {
    console.log(`Response received: ${data}`);

    processVariables.set("actionResult", data);
    taskService.complete(task, processVariables, new Variables());
  })
});

