import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'server', 'isl-course-data-v8.json');
const dst1 = path.join(__dirname, 'client', 'src', 'data', 'isl-course-data-v8.json');
const dst2 = path.join(__dirname, 'src', 'data', 'isl-course-data-v8.json');

const content = fs.readFileSync(src, 'utf8');

fs.mkdirSync(path.dirname(dst1), { recursive: true });
fs.writeFileSync(dst1, content, 'utf8');
console.log('Successfully wrote to client/src/data/isl-course-data-v8.json!');

if (fs.existsSync(path.dirname(dst2))) {
  fs.writeFileSync(dst2, content, 'utf8');
  console.log('Successfully wrote to src/data/isl-course-data-v8.json!');
}
