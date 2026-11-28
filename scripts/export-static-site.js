const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), 'deploy_package');

// Packages from seed data
const packageSlugs = [
  'dubai-extravaganza-luxury',
  'bali-bliss-tropical-paradise',
  'kashmir-paradise-on-earth-luxury',
  'kerela-gods-own-country-luxury',
  'vietnam-heritage-danang-luxury',
  'swiss-alps-parisian-romance-luxury',
  'singapore-malaysia-twin-glamour',
  'royal-rajasthan-heritage-luxury',
  'andaman-emerald-luxury-escape',
  'himachal-panoramic-luxury-circuit',
  'char-dham-yatra-sacred-himalayan-journey',
  'ayodhya-varanasi-spiritual-heritage'
];

const routes = [
  '/',
  '/about',
  '/contact',
  '/custom-tour',
  '/domestic',
  '/international',
  '/hotels',
  '/flights',
  '/cabs',
  '/bus',
  '/trains',
  '/visa',
  '/activities',
  '/themes',
  '/verify-email',
  '/terms',
  '/privacy-policy',
  '/cancellation-policy',
  '/account/login',
  '/portal',
  '/admin/login',
  '/admin/dashboard',
  '/admin/crm',
  '/admin/staff',
  '/admin/business',
  '/admin/pages',
  '/admin/enquiries',
  '/admin/packages',
  '/admin/destinations',
  ...packageSlugs.map(s => `/packages/${s}`)
];

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(data);
        } else {
          reject(new Error(`Failed ${urlPath}: status ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function exportSite() {
  console.log('1. Cleaning and preparing deploy_package directory...');
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('2. Fetching and generating HTML pages...');
  for (const route of routes) {
    try {
      console.log(`- Generating: ${route}`);
      const html = await fetchUrl(route);
      
      let filePath;
      if (route === '/') {
        filePath = path.join(OUTPUT_DIR, 'index.html');
      } else {
        const cleanPath = route.startsWith('/') ? route.slice(1) : route;
        const dir = path.join(OUTPUT_DIR, path.dirname(cleanPath));
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        // Save both as .html and folder/index.html for universal web server support
        filePath = path.join(OUTPUT_DIR, `${cleanPath}.html`);
        const subIndexDir = path.join(OUTPUT_DIR, cleanPath);
        if (!fs.existsSync(subIndexDir)) fs.mkdirSync(subIndexDir, { recursive: true });
        fs.writeFileSync(path.join(subIndexDir, 'index.html'), html, 'utf-8');
      }
      fs.writeFileSync(filePath, html, 'utf-8');
    } catch (err) {
      console.warn(`Warning on ${route}:`, err.message);
    }
  }

  console.log('3. Copying public assets...');
  copyDirRecursive(path.join(process.cwd(), 'public'), OUTPUT_DIR);

  console.log('4. Copying Next.js client static bundles...');
  const nextStaticDest = path.join(OUTPUT_DIR, '_next', 'static');
  copyDirRecursive(path.join(process.cwd(), '.next', 'static'), nextStaticDest);

  console.log('5. Creating Apache .htaccess with clean URL rewrites...');
  const htaccessContent = `# ====================================================================
# The TraveloPedia - Production Apache .htaccess Configuration
# ====================================================================

RewriteEngine On
RewriteBase /

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Resolve clean URLs to .html files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Custom 404 page
ErrorDocument 404 /index.html

# Enable Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>

# Browser Caching Headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, '.htaccess'), htaccessContent, 'utf-8');

  console.log('--- EXPORT COMPLETE! Directory size check: ---');
  const countFiles = (dir) => {
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory()) count += countFiles(path.join(dir, e.name));
      else count++;
    }
    return count;
  };
  console.log(`Total files generated in deploy_package: ${countFiles(OUTPUT_DIR)}`);
}

exportSite().catch(console.error);
