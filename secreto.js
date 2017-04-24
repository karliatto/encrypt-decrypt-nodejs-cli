'use strict';

const program = require('commander');
const fs = require('fs');
// in case nodejs was built without crypto module throws an error
let crypto;
	try {
		crypto = require('crypto');
	} catch (err) {
		console.log('crypto support is disabled!');
	}

const inquirer = require('inquirer');


function doEncrypt(file) {
	// var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
	var questions = [
		{
		    type: 'password',
		    name: 'key',
		    message: 'Insert a key:',
		    default: false
		}]
	inquirer.prompt(questions).then(function (answers) {
		console.log(answers)
		let input = fs.createReadStream(file);
		let output = fs.createWriteStream(file + '.enc');
		let cipher = crypto.createCipher('aes-256-cbc', answers.key);
		input.pipe(cipher).pipe(output);

		output.on('finish', function() {
		  console.log('Encrypted file written to disk!');
		  console.log('Filename: ' + file + '.enc');
		});
	})		
}


program
  .version('0.0.1')
  .description('secreto is a CLI for encrypting files')
  .option('-e, --encrypt <file>', 'encrypt the <file>', doEncrypt)
  .parse(process.argv)
