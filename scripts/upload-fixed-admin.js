const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function robustUpload() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  client.ftp.timeout = 60000; // 60s timeout

  try {
    console.log('Connecting to HostGator FTP...');
    await client.access({
      host: '119.18.54.171',
      user: 'travelo@thetravelopedia.com',
      password: 'Travelo@#$26',
      port: 21,
      secure: false
    });

    console.log('Connected! Uploading remaining files...');
    const deployDir = path.join(__dirname, '..', 'deploy_package');

    // 1. Upload admin folder again to be 100% sure
    console.log('\n--- 1. Uploading admin folder ---');
    await client.uploadFromDir(path.join(deployDir, 'admin'), 'admin');

    // 2. Upload _next static chunks
    console.log('\n--- 2. Uploading _next static chunks ---');
    await client.uploadFromDir(path.join(deployDir, '_next', 'static', 'chunks'), '_next/static/chunks');

    // 3. Upload custom-tour
    console.log('\n--- 3. Uploading custom-tour page ---');
    if (fs.existsSync(path.join(deployDir, 'custom-tour.html'))) {
      await client.uploadFrom(path.join(deployDir, 'custom-tour.html'), 'custom-tour.html');
    }
    if (fs.existsSync(path.join(deployDir, 'custom-tour'))) {
      await client.uploadFromDir(path.join(deployDir, 'custom-tour'), 'custom-tour');
    }

    // 4. Upload root html files
    console.log('\n--- 4. Uploading index.html and .htaccess ---');
    await client.uploadFrom(path.join(deployDir, 'index.html'), 'index.html');
    await client.uploadFrom(path.join(deployDir, '.htaccess'), '.htaccess');

    console.log('\n=== ALL FILES SUCCESSFULLY UPLOADED AND LIVE! ===');
  } catch (err) {
    console.error('Upload error:', err);
  } finally {
    client.close();
  }
}

robustUpload();
