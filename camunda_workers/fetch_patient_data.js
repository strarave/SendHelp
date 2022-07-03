const { Client, logger } = require('camunda-external-task-client-js');
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

client.subscribe('fetch_patient_data', async function ({ task, taskService }) {
    const patientId = task.variables.get('patientId');

    // Fetch patient data Patient DB using patientId as key
    const patientName = 'Veronica';
    const patientSurname = 'Bucci';
    const patientAddress = 'via del Campo, 21, 40027 Milano (MI)';

    processVariables = new Variables();

    processVariables.set("patientName", patientName);
    processVariables.set("patientSurname", patientSurname);
    processVariables.set("patientAddress", patientAddress);

    taskService.complete(task, processVariables, new Variables());
});
