var program = require('commander');
var fs = require('fs');

program
  .version('0.0.1')
  .option('-e, --encrypt [file]', 'encrypt the [file]')
  .parse(process.argv)


// var stream = fs.creteREadStream(program.file)

console.log(' %s ' + program.encrypt)