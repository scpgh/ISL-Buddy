const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'server', 'isl-course-data-v10 (1).json');
const dests = [
  path.join(__dirname, 'server', 'isl-course-data-v10.json'),
  path.join(__dirname, 'server', 'isl-course-data-v8.json'),
  path.join(__dirname, 'src', 'data', 'isl-course-data-v10.json'),
  path.join(__dirname, 'src', 'data', 'isl-course-data-v8.json'),
  path.join(__dirname, 'client', 'src', 'data', 'isl-course-data-v10.json'),
  path.join(__dirname, 'client', 'src', 'data', 'isl-course-data-v8.json'),
];

dests.forEach(dst => {
  const dir = path.dirname(dst);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dst);
  console.log('Copied to:', dst);
});

console.log('All dataset copies synced successfully!');
