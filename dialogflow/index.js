const { dialogflow } = require('actions-on-google');
const classModel = require('../models/classModel');
const foodModel = require('../models/foodModel');
const intakeFoodModel = require('../models/intakeFoodModel');
const IntakeModel = require('../models/IntakeModel');
const userModel = require('../models/userModel');
const whatModel = require('../models/whatModel');

const dialogIntent = dialogflow({ debug: false });

dialogIntent.intent('cibiSalvati', (conv, param, context) => {
    console.log(param);
    console.log(conv);
    conv.ask(`ohhhhh josh ti offro da bere domani`);
});

/* dialogIntent.intent('CreaNuovaTaskAddName', (conv, param, context) => {
    console.log(param);
    Task.name = param.taskname;
    Task.description = param.taskdescription;

    conv.ask(`Task name is ${param.taskname}, who should I assign the task to?`);

   });
dialogIntent.intent('CreaNuovaTaskAddAssignee', (conv, param, context) => {
    console.log(param);
    Task.assignee = param.person.name;
    Task.active = true;
    const inputData = new taskModel(Task);
    console.log(inputData);
    conv.ask(`Assigned task to ${param.person.name}`);
    inputData.save();

   });
dialogIntent.intent('StatusReport', (conv, param, context) => {
    console.log(param);
    var returnArr = [];
    return taskModel.find({}).then((data) => {
        data.forEach(task => {
            if (task.active === true)
                returnArr.push(task);
        });
        console.log(returnArr);
        conv.ask(`There are ${returnArr.length} active tasks at the moment`);
        })
    // conv.ask(`There are ${returnArr.length} active tasks at the moment`);
   });

 */
module.exports = {
    dialogIntent
}
