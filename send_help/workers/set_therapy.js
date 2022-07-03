const { Client, logger } = require('camunda-external-task-client-js');
const RESTClient = require('node-rest-client').Client;
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

const restClient = new RESTClient();

client.subscribe('set_therapy', async function ({ task, taskService }) {
    // Get generic info
    const doctorId = task.variables.get('doctorId');
    const patientId = task.variables.get('patientId');

    console.log(`Patient ${patientId}`);
    console.log(`Doctor ${doctorId}`);

    // Get therapy details
    const therapyId = task.variables.get('therapyId');
    const therapyDrug = task.variables.get('therapyDrug')
    const therapyDosage = task.variables.get('therapyDosage')
    const therapyComment = task.variables.get('therapyComment')

    console.log(`Therapy ${therapyId} - ${therapyDrug}, ${therapyDosage}\n${therapyComment}`);


    var args = {
        headers: { "Content-Type": "application/json" },

    };

    processVariables = new Variables();
    localVariables = new Variables();


    if (therapyId == null) {
        args['body'] = {
            "id": therapyId,
            "oncologist": doctorId,
            "patient": patientId,
            "drug": therapyDrug,
            "dosage": therapyDosage,
            "comment": therapyComment
        }

        restClient.post('http://localhost:3000/therapies', args, function (data, response) {
            console.log(`Response received: ${data}`);

            processVariables.set("set_therapy_response", data);
            taskService.complete(task, processVariables, localVariables);
        })
    }

    else {
        args['body'] = {
            "oncologist": doctorId,
            "patient": patientId,
            "drug": therapyDrug,
            "dosage": therapyDosage,
            "comment": therapyComment
        }

        restClient.post(`http://localhost:3000/therapies/${therapyId}`, args, function (data, response) {
            console.log(`Response received: ${data}`);

            processVariables.set("set_therapy_response", data);
            taskService.complete(task, processVariables, localVariables);
        })
    }
});

