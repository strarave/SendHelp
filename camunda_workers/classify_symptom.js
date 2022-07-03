const { Client, logger, Variables } = require('camunda-external-task-client-js');
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

client.subscribe('classify_symptom', async function ({ task, taskService }) {
    const patientId = task.variables.get('patientId');
    const symptomName = task.variables.get('symptomName');
    const reportedSymptomSeverity = task.variables.get('reportedSymptomSeverity');

    console.log(`Patient ${patientId}\nSymptom: ${symptomName}\nReported severity: ${reportedSymptomSeverity} /4`);

    processVariables = new Variables();

    // Check symptom severity
    var isSymtpomSevere = parseInt(reportedSymptomSeverity) > 1;

    processVariables.set("isSymptomSevere", isSymtpomSevere);
    taskService.complete(task, processVariables, new Variables());
});

