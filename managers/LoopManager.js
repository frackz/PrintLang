function onlyNumbers(str) {return /^[0-9]+$/.test(str);}
const varM = require('./VariableManager')
module.exports = class VariableManager {
    constructor(vars) {
        this.varManager = new varM(vars)
    }
    loop(line, num) {
        const values = line.split(' ')

        // If the values match our syntax.
        if (values[0] != 'loop') {return console.error(`Syntax error on line ${num}, tried to loop`)}
        if (!onlyNumbers(values[1]) || values[1] == null) {return console.error(`Syntax error, cannot loop without a loop amount`)}
        if (values[2] != 'times') {return console.error(`Synax error on line ${num}, cannot loop without 'times'`)}
        if (values[3] != '=') {return console.error(`Synax error on line ${num}, needs to be a = for the code`)}
        if (values[4] == '') {return console.error(`Synax error on line ${num}, value is null`)}

        for (var i = 0; i < parseInt(values[1]); i++) {
            const response = this.varManager.load(line.split("times = ")[1], true)
            if (response.error == true) {
                console.log("Error found! "+response.errorMessage)
            } else {
                console.log(response.message)
            }
        }
    }
}
