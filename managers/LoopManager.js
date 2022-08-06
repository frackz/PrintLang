function onlyNumbers(str) {return /^[0-9]+$/.test(str);}
function checkOccurences(string, word) {return string.split(word).length - 1;}
module.exports = class VariableManager {
    constructor(vars) {
        this.vars = vars
        this.varM = require('./VariableManager')
        this.varManager = new this.varM(vars)
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
            //
            console.log(this.varManager.load(line.split("times = ")[1]))
        }
    }
}