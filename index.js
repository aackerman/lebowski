var request = require('request');
var nomnom  = require('nomnom');

nomnom
  .command('random')
  .callback(function(opts) {
    request
      .get('http://lebowski.me/api/quotes/random')
      .pipe(process.stdout);
  })
  .help("Get a random quote");

nomnom
  .command('quote')
  .callback(function(args) {
    var id = args[1];

    if (!isNaN(id)) {
      request
        .get('http://lebowski.me/api/quotes/' + id)
        .pipe(process.stdout);
    }
  })
  .help("Get a quote by id");

nomnom
  .command('line')
  .callback(function(args) {
    var id = args[1];

    if (!isNaN(id)) {
      request
        .get('http://lebowski.me/api/lines/' + id)
        .pipe(process.stdout);
    }
  })
  .help("Get a line by id");

nomnom
  .command('search')
  .callback(function(args) {
    var args = args['_'].slice(1);
    var url = 'http://lebowski.me/api/quotes/search?term=' + encodeURI(args.join(' '));
    request
      .get(url)
      .pipe(process.stdout);
  })
  .help("Search by slurped arguments e.g.: lebowski search that poor woman");

nomnom.parse();
