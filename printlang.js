const Variable = require('./managers/VariableManager')
const Loop = require('./managers/LoopManager')
const Hashmap = require('hashmap')

const Variables = new Hashmap()

const file = process.argv[2]
if (file == null) {return console.error("Cannot find the specified file")}
if (!file.endsWith('.pg')) {return console.error("File needs to end with .pg")}
try {if (!require('fs').existsSync(file)) {return console.error("The specified file does not exist.")}} catch(err) {console.error(err)}

var content = ''; try {content = require('fs').readFileSync(file, 'utf8');} catch (err) {console.error(err);}
var splitted = content.split('\n')
if (splitted.length == 0) {return console.log()}

const VariableManager = new Variable(Variables)
const LoopManager = new Loop(Variables)

var CurrentLine = 0

splitted.forEach(function(contents) {
    CurrentLine++;
    if (contents.startsWith('###')) {}
    else if (contents == '') {}
    else if (contents.startsWith('var')) {VariableManager.init(contents, CurrentLine)} 
    else if(contents.startsWith('loop')) {LoopManager.loop(contents, CurrentLine)} 
    else {console.log(VariableManager.load(contents).message.replace("print = ", ""))}
})

