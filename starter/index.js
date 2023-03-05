const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { create } = require("domain");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const idList = []
const teamMembars = []
const managerId = []

const appMenu = () => {
    function buildTeam() {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembars), "utf-8");
    }
    function addItern() {
            inquirer.prompt([
                {
                    type: "imput",
                    name: "internName",
                    message: "what is your intern name ?" 
                },
                {
                    type: "imput",
                    name: "engineerId",
                    message: "what is your intern id?" 
                },
                {
                    type: "imput",
                    name: "internEmail",
                    message: "what is your intern email ?" 
                },
                {
                    type: "imput",
                    name: "internChool",
                    message: "what is your intern school ?" 
                },
    
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembars.push(intern);
            idList.push(answers.internId);
            console.log(intern);
            createTeam();
        })
        
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "imput",
                name: "engineerName",
                message: "what is your engineer name ?" 
            },
            {
                type: "imput",
                name: "engineerId",
                message: "what is your engineer id?" 
            },
            {
                type: "imput",
                name: "engineerEmail",
                message: "what is your engineer email ?" 
            },
            {
                type: "imput",
                name: "engineerGitHub",
                message: "what is your engineer gitHub ?" 
            },

    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
        teamMembars.push(engineer);
        idList.push(answers.engineerId);
        console.log(engineer);
        createTeam();
    })
    }
    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont need any more team members",

                ]
            }
    ]).then(userChoice => {
        if (userChoice.memberChoice === "Engineer") {
            addEngineer();
         } else if(userChoice.memberChoice === "Intern") {
            addItern();
         } else {
            buildTeam();
         }
    })

    }
    function createManager(){
        console.log("Please build your team");
        inquirer.prompt([
            {
                type: "imput",
                name: 'managerNmae',
                message: "what is team manager name?",
                validate: answer => {
                    if(answer !== ""){
                        return true
                    }
                    return "plaese enter atleast one character"
                        
                }
            },
            {
                type: "imput",
                name: 'managerId',
                message: "what is team manager id?",
            },
            {
                type: "imput",
                name: 'managerEmail',
                message: "what is team manager email?",
            },
            {
                type: "imput",
                name: 'managerOfficeNumber',
                message: "what is team manager offfice number?",
            },


        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            teamMembars.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })
    }
    createManager();
}


appMenu();