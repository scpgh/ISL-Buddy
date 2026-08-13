const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'server', 'isl-course-data-v8.json');
const dst1 = path.join(__dirname, 'client', 'src', 'data', 'isl-course-data-v8.json');
const dst2 = path.join(__dirname, 'src', 'data', 'isl-course-data-v8.json');

fs.copyFileSync(src, dst1);
console.log('Successfully copied to client/src/data/isl-course-data-v8.json!');

if (fs.existsSync(path.dirname(dst2))) {
  fs.copyFileSync(src, dst2);
  console.log('Successfully copied to src/data/isl-course-data-v8.json!');
}
