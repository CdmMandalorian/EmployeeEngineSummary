const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const render = require("./lib/htmlRenderer.js");

const writeFileAsync = util.promisify(fs.writeFile);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];
let userId = 1;
let html;

function createHtmlFile(html){
    writeFileAsync(outputPath, html);
}

function askForManagerInfo(){
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is their name?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is their email?",
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is their office number?",
        }
    ]).then(response => {
        const newManager = new Manager(response.managerName, userId, response.managerEmail, response.managerOfficeNumber);
        employees.push(newManager);
        userId++;
        askForNewTeamMember();
    })
}

function askForEnginnerInfo(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is their name?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is their email?",
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is their GitHub username?",
        }
    ]).then(response => {
        const newEngineer = new Engineer(response.engineerName, userId, response.engineerEmail, response.engineerGithub);
        employees.push(newEngineer);
        userId++;
        askForNewTeamMember();
    })
}

function askForInternInfo(){
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is their name?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is their email?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "Where do they go to school?",
        }
    ]).then(response => {
        const newIntern = new Intern(response.internName, userId, response.internEmail, response.internSchool);
        employees.push(newIntern);
        userId++;
        askForNewTeamMember();
    })
}

function askForNewTeamMember(){
    inquirer.prompt([
        {
            type: "list",
            name: "response",
            message: `Would you like to add a new team member?`,
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "No more team members.",
            ]
        }
    ]).then(response => {
        if(response.response === "Manager"){
            askForManagerInfo();
        }

        if(response.response === "Engineer"){
            askForEnginnerInfo();
        }

        if(response.response === "Intern"){
            askForInternInfo();
        }

        if(response.response === "No more team members."){
            html = render(employees);
            createHtmlFile(html);
        }
    });
}

askForNewTeamMember();