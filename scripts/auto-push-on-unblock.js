const ftp = require('basic-ftp');
const path = require('path');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoPush() {
  const localDir = path.join(__dirname, '..', 'deploy_package');
  console.log('Monitoring connection to HostGator FTP (119.18.54.171)...');

  while (true) {
    const client = new ftp.Client(8000);
    client.ftp.verbose = false;

    try {
      await client.access({
        host: '119.18.54.171',
        user: 'travelo@thetravelopedia.com',
        password: 'Travelo@#$26',
        port: 21,
        secure: false
      });

      console.log('SUCCESS! Connected to HostGator FTP!');
      console.log('Starting upload of all updated files...');

      let lastLogged = 0;
      client.trackProgress(info => {
        const now = Date.now();
        if (now - lastLogged > 2000) {
          console.log(`Uploaded: ${info.name} (${(info.bytesOverall / 1024 / 1024).toFixed(2)} MB total)`);
          lastLogged = now;
        }
      });

      await client.uploadFromDir(localDir);
      console.log('=== PUSH SUCCESSFUL! ALL FILES LIVE ON HOSTATOR ===');
      client.close();
      return;
    } catch (err) {
      console.log(`[${new Date().toLocaleTimeString()}] Still waiting for firewall unblock (${err.message}). Retrying in 10s...`);
      client.close();
      await sleep(10000);
    }
  }
}

autoPush();
