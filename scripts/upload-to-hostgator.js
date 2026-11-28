const ftp = require('basic-ftp');
const path = require('path');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadSite() {
  const localDir = path.join(__dirname, '..', 'deploy_package');

  for (let attempt = 1; attempt <= 5; attempt++) {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
      console.log(`[Attempt ${attempt}/5] Connecting to HostGator FTP (119.18.54.171)...`);
      await client.access({
        host: '119.18.54.171',
        user: 'travelo@thetravelopedia.com',
        password: 'Travelo@#$26',
        port: 21,
        secure: false
      });

      console.log('Successfully connected to HostGator FTP!');
      console.log('Starting upload of updated files...');

      let lastLogged = 0;
      client.trackProgress(info => {
        const now = Date.now();
        if (now - lastLogged > 2000) {
          console.log(`Uploaded: ${info.name} (${(info.bytesOverall / 1024 / 1024).toFixed(2)} MB total)`);
          lastLogged = now;
        }
      });

      await client.uploadFromDir(localDir);

      console.log('=== UPLOAD COMPLETE! ===');
      console.log('All files updated without refresh loop!');
      client.close();
      return;
    } catch (err) {
      console.error(`Attempt ${attempt} failed:`, err.message);
      client.close();
      if (attempt < 5) {
        console.log('Waiting 5 seconds before retrying...');
        await sleep(5000);
      }
    }
  }
}

uploadSite();
