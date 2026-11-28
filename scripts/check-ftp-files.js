const ftp = require('basic-ftp');

async function checkFiles() {
  const c = new ftp.Client();
  try {
    await c.access({
      host: '119.18.54.171',
      user: 'travelo@thetravelopedia.com',
      password: 'Travelo@#$26',
      port: 21
    });
    const list = await c.list();
    console.log('Total items in root:', list.length);
    console.log('Folders & key files:');
    list.forEach(item => {
      if (item.isDirectory || item.name.includes('admin') || item.name.includes('index') || item.name.includes('about')) {
        console.log(`- ${item.isDirectory ? '[DIR]' : '[FILE]'} ${item.name} (${item.size} bytes)`);
      }
    });

    console.log('\nChecking /admin directory:');
    const adminList = await c.list('admin');
    adminList.forEach(item => {
      console.log(`  - ${item.isDirectory ? '[DIR]' : '[FILE]'} ${item.name}`);
    });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    c.close();
  }
}

checkFiles();
