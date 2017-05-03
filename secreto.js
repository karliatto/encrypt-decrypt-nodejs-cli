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
	const questions = [
		{
			type: 'password',
			name: 'key',
			message: 'Insert a password to encrypt the file: ' + file ,
			default: false
		}]
	inquirer.prompt(questions).then(function (answers) {
		console.log(answers)
		const input = fs.createReadStream(file);
		const output = fs.createWriteStream(file + '.enc');
		const cipher = crypto.createCipher('aes-256-cbc', answers.key);
		input.pipe(cipher).pipe(output);

		output.on('finish', function() {
			console.log('Encrypted file written to disk!');
			console.log('Filename: ' + file + '.enc');
		});
	})		
}

function doDecrypt(file) {
	const questions = [
		{
			type: 'password',
			name: 'key',
			message: 'Insert a password to decrypt the file:',
			default: false
		}]
	inquirer.prompt(questions).then(function (answers) {
		const input = fs.createReadStream(file);
		const filenameOutput = file.slice(0, file.length - 4)
		const output = fs.createWriteStream(filenameOutput);
		const deCipher = crypto.createDecipher('aes-256-cbc', answers.key);
		input.pipe(deCipher).pipe(output);

		output.on('finish', function() {
			console.log('Decrypted file written to disk!');
			console.log('Filename: ' + filenameOutput);
		});
	})		
}

program
	.version('0.0.2')
	.description('secreto is a CLI for encrypting files')
	.option('-e, --encrypt <file>', 'encrypt the <file>', doEncrypt)
	.option('-d, --decrypt <file>', 'decrypt the <file>', doDecrypt)
	.parse(process.argv)
