const ftp = require('basic-ftp');

async function testConnection() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    console.log('Testing FTP connection to 119.18.54.171...');
    await client.access({
      host: '119.18.54.171',
      user: 'travelo@thetravelopedia.com',
      password: 'Travelo@#$26',
      port: 21,
      secure: false, // will try explicit TLS if requested
    });
    console.log('Connected! Listing directory:');
    const list = await client.list();
    console.log(list.map(f => `${f.name} (${f.size} bytes)`).slice(0, 10));
  } catch (err) {
    console.error('Connection error (plain):', err.message);
    try {
      console.log('Trying with secure: true (explicit TLS)...');
      const clientTls = new ftp.Client();
      clientTls.ftp.verbose = true;
      await clientTls.access({
        host: '119.18.54.171',
        user: 'travelo@thetravelopedia.com',
        password: 'Travelo@#$26',
        port: 21,
        secure: true,
        secureOptions: { rejectUnauthorized: false }
      });
      console.log('TLS Connected! Listing directory:');
      const list = await clientTls.list();
      console.log(list.map(f => `${f.name} (${f.size} bytes)`).slice(0, 10));
      clientTls.close();
    } catch (tlsErr) {
      console.error('TLS Connection error:', tlsErr.message);
    }
  } finally {
    client.close();
  }
}

testConnection();
