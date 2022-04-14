const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const {spawn} = require('child_process');
app.use(bodyParser.json());
var checkwordlist = "";
var checkweights = "";
function readFile(filename){
	var contents = fs.readFileSync(filename).toString();
	counts = contents.split(/\r\n|\r|\n/);
	var dict = {};
	for (let i = 0; i < counts.length - 1; i++) {
		c1 = counts[i].replace('(', '');
		c2 = c1.replace(')', '');
		entry = c2.split(',');
		dict[entry[0]] = parseInt(entry[1].trim());
	}
	return dict;
}
function getLengthCounts() {
	var a = readFile('output/part-00000');
	var b = readFile('output/part-00001');
	var c = Object.assign({},a,b);
	return c;
}
function readAnalyzeResult(filename) {
	var contents = fs.readFileSync(filename).toString();
	//console.log(contents);
	lines = contents.split(/\r\n|\r|\n/);
	var ready = 0;
	if (lines[0] === checkwordlist && lines[1] === checkweights) {
		ready = 1;
	}
	console.log(lines[0] === checkwordlist);
	console.log(lines[0]);
	console.log(checkwordlist);
	console.log(lines[1] === checkweights);
	console.log("ready:" + ready);
	if (ready == 0) {
		return "Not done yet";
	}
	var obj = JSON.parse(lines[2].replace(/'/g,"\""));
	console.log(obj);
	return obj;
}
app.get('/lengthCounts', (req,res)=> {
	var dict = getLengthCounts();
	res.json(dict);
});
function runPython(wordlist, weights) {
	const py = spawn('python3', ['test.py','input', wordlist, weights]);
	py.stdout.on('data',(data)=> {
    		console.log(`stdout: ${data}`);
	});
	py.stderr.on('data',(data)=> {
		console.log(`stdout: ${data}`);
	});
	py.on('close', (code)=>{
		console.log(`exited with code ${code}`);
	});
}
app.post('/analyze', (req,res) => {
	//console.log(req.body);
	let wordlist = JSON.stringify(req.body.wordlist);
	console.log(wordlist);
	checkwordlist = wordlist
	let weights = JSON.stringify(req.body.weights);
	console.log(weights);
	checkweights = weights
	runPython(wordlist, weights);
	res.json({'message':'request sent'});
});
app.get('/result', (req,res) => {
	var response = readAnalyzeResult('testpart4out.txt');
	res.json(response);
});
var http = require('http').Server(app);
const PORT = 80;
http.listen(PORT, function() {
        console.log('Listening');
});
