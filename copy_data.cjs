const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'server', 'isl-course-data-v8.json');
const dst1 = path.join(__dirname, 'client', 'src', 'data', 'isl-course-data-v8.json');
const dst2 = path.join(__dirname, 'src', 'data', 'isl-course-data-v8.json');

fs.copyFileSync(src, dst1);
fs.copyFileSync(src, dst2);

console.log('SUCCESS: Copied full 10-module dataset!');
console.log('dst1 size:', fs.statSync(dst1).size);
console.log('dst2 size:', fs.statSync(dst2).size);
