const Employee = require("./Employee");

class Interns extends Employee{
    constructor(name, id, email, school){
        super(name, id, email)
        this.school = school;
        this.role = "Intern";
    }

    getRole(){
        return this.role;
    }

    getSchool(){
        return this.school;
    }
}

module.exports = Interns;