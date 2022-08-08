function onlyNumbers(str) {return /^[0-9]+$/.test(str);}
function checkOccurences(string, word) {return string.split(word).length - 1;}
module.exports = class VariableManager {
    constructor(vars) {
        this.vars = vars
    }

    edit(line) {
      const values = line.split(" ")
      if (!values[0] == 'edit') {
        return console.error("Syntax error, delete")
      }
      if (this.vars.get(values[1]) == false) {
        return console.error("Edit variable is invalid")
      }

      if (values[2] != '=') {
        return console.error("Edited variables needs = for value")
      }
      if (values.length < 3) {
        return console.error("Needs variable new value")
      } 
      var contents = values[3]
      if (values.length > 4) {
          contents = ''
          for (var i = 0; i < values.length-3; i++) {
              if (values.length == i+4) {contents+=values[i+3]} else {contents+=values[i+3]+' '}
          }
      }
      contents = contents.replace(/(\r\n|\n|\r)/gm, "");
      this.vars.set(values[1], contents)
    }

    delete(line) {
      const values = line.split(" ")
      if (!values[0] == 'delete') {
        return console.error("Syntax error, delete")
      }
      if (values[1] == '') {
        return console.error("Delete variable is invalid")
      }

      if (this.vars.get(values[1]) == false) {
        return console.error("Deleted variable doesnt exist")
      }

      this.vars.remove(values[1])
    }
  
    init(line, num) {
        const values = line.split(' ')

        // If the values match our syntax.
        if (values[0] != 'var') {return console.error(`Syntax error on line ${num}, tried to load a variable`)}
        if (onlyNumbers(values[1]) || values[1] == null) {return console.error(`Syntax error, variable name on line ${num} is only numbers or null`)}
        if (values[2] != '=') {return console.error(`Synax error on line ${num}, variable cannot be set without '='`)}
        if (values[3] == null) {return console.error(`Synax error on line ${num}, value is null`)}

        var contents = values[3]
        if (values.length > 4) {
            contents = ''
            for (var i = 0; i < values.length-3; i++) {
                if (values.length == i+4) {contents+=values[i+3]} else {contents+=values[i+3]+' '}
            }
        }
        contents = contents.replace(/(\r\n|\n|\r)/gm, "");
        if (this.vars.get(values[1]) != null) {return console.error(`Error while trying to create a already existing variable on line ${num}`)}
        this.vars.set(''+values[1]+'', contents)
    }

    load(line) {
        if (!line.startsWith("print")) {return console.error("Syntax not loaded")}
        const splitted = line.split(" ")
        if (!splitted[1] == "=") {return console.error("Neet a = after printing...")}
        var returnLine = line
        for (var i = 0; i < checkOccurences(line, "#var="); i++) {
            returnLine=returnLine.replace(/(\r\n|\n|\r)/gm, "");
            const name = returnLine.split("#var=")[1].split(" ")[0]
            if (!this.vars.has(name)) {return console.error(`Variable doesn't exist, with name ${name}`)}
            returnLine = returnLine.replace(`#var=${name}`, this.vars.get(name))
        }
        return returnLine.replace("print = ","")
    }
}
