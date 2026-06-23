const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = {
  max_life: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Axis_Max_Life_Insurance_logo.svg',
  hdfc_life: 'https://upload.wikimedia.org/wikipedia/commons/4/41/HDFC_LifeInsurance.png',
  icici_pru: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
  bajaj_life: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Bajaj_Finserv_Logo.svg',
  aditya_birla: 'https://upload.wikimedia.org/wikipedia/hi/4/4c/Aditya_Birla_Group_logo.png'
};

const dir = path.join(__dirname, 'public', 'images', 'logos');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

let count = 0;
const total = Object.keys(logos).length;

Object.entries(logos).forEach(([name, url]) => {
  const ext = url.endsWith('.svg') ? '.svg' : url.endsWith('.png') ? '.png' : '.jpg';
  const filePath = path.join(dir, `${name}${ext}`);
  const file = fs.createWriteStream(filePath);
  
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
      // Handle redirect
      https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
        res2.pipe(file);
      });
    } else {
      response.pipe(file);
    }
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}${ext}`);
      count++;
      if (count === total) {
        console.log("ALL DOWNLOADED");
        process.exit(0);
      }
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}:`, err.message);
  });
});
