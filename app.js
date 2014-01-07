var request   = require('request')
    , cheerio = require('cheerio')
    , colors  = require('colors');

var aktien = {
    'ARM': 'http://www.finanzen.net/realtime_stuttgart/ARM',
    'Continental': 'http://www.finanzen.net/realtime_stuttgart/Continental',
    'XING': 'http://www.finanzen.net/realtime_stuttgart/XING',
    'Telekom': 'http://www.finanzen.net/realtime_stuttgart/Deutsche_Telekom'
};

for (aktie in aktien) {
    request(aktien[aktie], function(err, resp, body) {
        if (err) throw err;
        console.log(resp.request.uri.href.bold.green);
        $ = cheerio.load(body);
        $('td').each(function() {
            if (this.text().indexOf('Geld') != -1 || this.text().indexOf('Brief') != -1) {
                console.log(this.text().bold.underline.yellow);
            }
            if (this.text().indexOf('Zeit') != -1) {
                console.log(this.text());
            }
        });
    });
}