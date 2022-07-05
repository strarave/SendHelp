const { Client, logger, Variables } = require('camunda-external-task-client-js');
const RESTClient = require('node-rest-client').Client;
const open = require('open');

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

const restClient = new RESTClient();

client.subscribe('add_therapy', async function ({ task, taskService }) {
    // Get generic info
    const doctorId = task.variables.get('doctorId');
    const patientId = task.variables.get('patientId');

    console.log(`Patient ${patientId}`);
    console.log(`Doctor ${doctorId}`);

    // Get therapy details
    const therapyDrug = task.variables.get('therapyDrug');
    const therapyDosage = task.variables.get('therapyDosage');
    const therapyComment = task.variables.get('therapyComment');

    console.log(`Therapy: ${therapyDrug}, ${therapyDosage}`);
    console.log(`Comment: ${therapyComment}`);

    var args = {
        headers: { "Content-Type": "application/json" },
        data: {
            oncologist: doctorId,
            patient: patientId,
            drug: therapyDrug,
            dosage: therapyDosage,
            comment: therapyComment
        }
    };

    processVariables = new Variables();
    processVariables.set("actionDetails", `Therapy added: ${therapyDrug}, ${therapyDosage} (${therapyComment})`);

    restClient.post('http://localhost:3000/therapies', args, function (data, response) {
        console.log(`Response received: ${data}, ${JSON.stringify(response)}`);

        processVariables.set("actionResult", data);
        taskService.complete(task, processVariables, new Variables());
    });
});

