var soap = require('soap');
var url = 'http://localhost:8000?wsdl';

const args = process.argv.slice(2);

soap.createClient(url, {}, function(err, client) {
  if (args.length === 0) {
    console.log('Invalid command. Please use either -l or -f <from date> <to date> <valute ID>.');
  }

  if (args.indexOf('-l') != -1) {
    client.getValutes({}, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(JSON.stringify(result.response.response));
    });
  }


  if (args.indexOf('-f') != -1 && args.length > args.indexOf('-f') + 3) {
    let index = args.indexOf('-f')
    const params = { FromDate: args[index + 1], ToDate: args[index + 2], ValutaCode: args[index + 3] };
    client.getValute(params, function(err, result) {
      if (err) {
        console.log(`Ошибка: ${err}`);
        return;
      }
      console.log(JSON.stringify(result.response.response));
    });

    
  }
});

