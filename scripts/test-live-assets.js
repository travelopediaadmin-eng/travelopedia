const https = require('https');

function testLive() {
  const req = https.request({
    host: '119.18.54.171',
    path: '/',
    servername: 'thetravelopedia.com',
    headers: { Host: 'thetravelopedia.com' },
    rejectUnauthorized: false
  }, res => {
    let html = '';
    res.on('data', c => html += c);
    res.on('end', () => {
      console.log('Homepage Status:', res.statusCode);
      const matches = html.match(/(src|href)="(\/[^"#?]+)"/g) || [];
      const paths = [...new Set(matches.map(m => m.match(/"(\/[^"#?]+)"/)[1]))];
      console.log('Total local paths found in homepage:', paths.length);
      
      paths.slice(0, 20).forEach(p => {
        const r = https.request({
          host: '119.18.54.171',
          path: p,
          servername: 'thetravelopedia.com',
          headers: { Host: 'thetravelopedia.com' },
          rejectUnauthorized: false
        }, ares => {
          console.log(p, ares.statusCode);
        });
        r.end();
      });
    });
  });
  req.end();
}

testLive();
