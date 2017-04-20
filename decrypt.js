var fs = require('fs');
// in case nodejs was built without crypto module throws an error
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
var deCipher = crypto.createDecipher('aes-256-cbc', key);
var input = fs.createReadStream('test.txt.enc');
var output = fs.createWriteStream('foto.jpeg');

input.pipe(deCipher).pipe(output);

output.on('finish', function() {
  console.log('Encrypted file written to disk!');
});