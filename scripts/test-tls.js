const ftp = require('basic-ftp');

async function testTls() {
  const client = new ftp.Client(10000);
  client.ftp.verbose = true;
  try {
    console.log('Connecting with TLS...');
    await client.access({
      host: '119.18.54.171',
      user: 'travelo@thetravelopedia.com',
      password: 'Travelo@#$26',
      port: 21,
      secure: true,
      secureOptions: { rejectUnauthorized: false }
    });
    console.log('TLS Success!');
    client.close();
  } catch (e) {
    console.error('TLS Fail:', e.message);
  }
}

testTls();
