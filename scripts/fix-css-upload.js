const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function fixCssUpload() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  client.ftp.timeout = 60000;

  try {
    console.log('Connecting to HostGator FTP...');
    await client.access({
      host: '119.18.54.171',
      user: 'travelo@thetravelopedia.com',
      password: 'Travelo@#$26',
      port: 21,
      secure: false
    });

    const deployDir = path.join(__dirname, '..', 'deploy_package');
    const cssLocalDir = path.join(deployDir, '_next', 'static', 'css');

    // Always reset to root
    console.log('\n--- Navigating to root / ---');
    await client.cd('/');

    // Ensure /_next/static/css exists from root
    console.log('\n--- Ensuring /_next/static/css ---');
    await client.cd('/_next/static/css');
    console.log('Current directory on server:', await client.pwd());

    const cssFiles = fs.readdirSync(cssLocalDir);
    for (const file of cssFiles) {
      console.log(`Uploading ${file} into /_next/static/css/${file}...`);
      await client.uploadFrom(path.join(cssLocalDir, file), file);
    }

    // Now upload media fonts into /_next/static/media
    const mediaLocalDir = path.join(deployDir, '_next', 'static', 'media');
    if (fs.existsSync(mediaLocalDir)) {
      await client.cd('/');
      await client.ensureDir('/_next/static/media');
      await client.cd('/_next/static/media');
      const mediaFiles = fs.readdirSync(mediaLocalDir);
      for (const file of mediaFiles) {
        console.log(`Uploading ${file} into /_next/static/media/${file}...`);
        await client.uploadFrom(path.join(mediaLocalDir, file), file);
      }
    }

    // Now upload build manifest folder J0AISjOxHUOOKsAl4-I2g into /_next/static/J0AISjOxHUOOKsAl4-I2g
    const staticLocal = path.join(deployDir, '_next', 'static');
    const staticDirs = fs.readdirSync(staticLocal, { withFileTypes: true });
    for (const d of staticDirs) {
      if (d.isDirectory() && d.name !== 'chunks' && d.name !== 'css' && d.name !== 'media') {
        await client.cd('/');
        await client.ensureDir(`/_next/static/${d.name}`);
        await client.cd(`/_next/static/${d.name}`);
        const files = fs.readdirSync(path.join(staticLocal, d.name));
        for (const file of files) {
          console.log(`Uploading ${file} into /_next/static/${d.name}/${file}...`);
          await client.uploadFrom(path.join(staticLocal, d.name, file), file);
        }
      }
    }

    console.log('\n=== CSS AND ASSETS DIRECTLY UPLOADED INTO CORRECT PATHS! ===');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

fixCssUpload();
