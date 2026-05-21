import http from 'http';

const paths = [
  '/',
  '/term-life',
  '/term-life/what-is-term-insurance',
  '/term-life/term-vs-life-insurance',
  '/term-life/best-term-insurance-plans',
  '/term-life/1-crore-term-insurance',
  '/term-life/nri-term-insurance',
  '/health',
  '/health/compare-plans',
  '/health/what-is-health-insurance',
  '/health/best-health-insurance-plans',
  '/health/family-health-insurance',
  '/about',
  '/claims',
  '/privacy',
  '/terms',
  '/disclaimer'
];

async function testPath(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      console.log(`PATH: ${path} => STATUS: ${res.statusCode} (Content-Type: ${res.headers['content-type']})`);
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({ path, status: res.statusCode, bodyLength: body.length });
      });
    }).on('error', (err) => {
      console.error(`PATH: ${path} => ERROR:`, err.message);
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('--- Testing Slugs ---');
  for (const path of paths) {
    await testPath(path);
  }
  console.log('--- Done ---');
}

run();
