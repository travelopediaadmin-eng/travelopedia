const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadMissingStatic() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  client.ftp.timeout = 60000;

  try {
    console.log('Connecting to HostGator FTP to upload missing CSS & Media bundles...');
    await client.access({
      host: '119.18.54.171',
      user: 'travelo@thetravelopedia.com',
      password: 'Travelo@#$26',
      port: 21,
      secure: false
    });

    const deployDir = path.join(__dirname, '..', 'deploy_package');
    const staticDir = path.join(deployDir, '_next', 'static');

    // 1. Upload CSS folder (CRITICAL: Contains 87d6a558b5270c8e.css - Tailwind CSS)
    console.log('\n--- 1. Uploading _next/static/css ---');
    await client.ensureDir('_next/static/css');
    await client.uploadFromDir(path.join(staticDir, 'css'), '_next/static/css');

    // 2. Upload Media folder (Fonts, Icons)
    console.log('\n--- 2. Uploading _next/static/media ---');
    if (fs.existsSync(path.join(staticDir, 'media'))) {
      await client.ensureDir('_next/static/media');
      await client.uploadFromDir(path.join(staticDir, 'media'), '_next/static/media');
    }

    // 3. Upload Build Manifest folder (e.g. J0AISjOxHUOOKsAl4-I2g)
    const entries = fs.readdirSync(staticDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'chunks' && entry.name !== 'css' && entry.name !== 'media') {
        console.log(`\n--- 3. Uploading build manifest folder: _next/static/${entry.name} ---`);
        await client.ensureDir(`_next/static/${entry.name}`);
        await client.uploadFromDir(path.join(staticDir, entry.name), `_next/static/${entry.name}`);
      }
    }

    console.log('\n=== CSS AND STATIC BUNDLES SUCCESSFULLY UPLOADED! ===');
  } catch (err) {
    console.error('Upload error:', err);
  } finally {
    client.close();
  }
}

uploadMissingStatic();
