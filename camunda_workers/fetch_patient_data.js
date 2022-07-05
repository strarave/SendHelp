const { Client, logger, Variables } = require('camunda-external-task-client-js');
const open = require('open');

const config = { baseUrl: 'http://camunda:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

client.subscribe('fetch_patient_data', async function ({ task, taskService }) {
    const patientId = task.variables.get('patientId');

    // Fetch patient data Patient DB using patientId as key
    var patientName = 'Veronica';
    var patientSurname = 'Bucci';
    var patientAddress = 'via del Campo, 21, 40027 Milano (MI)';

    console.log(`${patientName} ${patientSurname}, address: ${patientAddress}`);

    processVariables = new Variables();
    processVariables.set("patientName", patientName);
    processVariables.set("patientSurname", patientSurname);
    processVariables.set("patientAddress", patientAddress);

    taskService.complete(task, processVariables, new Variables());
});
