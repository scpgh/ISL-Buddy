const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'server', 'isl-course-data-v10 (1).json');

const targetFiles = [
  path.join(__dirname, 'server', 'isl-course-data-v10 (1).json'),
  path.join(__dirname, 'server', 'isl-course-data-v10.json'),
  path.join(__dirname, 'server', 'isl-course-data-v8.json'),
  path.join(__dirname, 'src', 'data', 'isl-course-data-v10.json'),
  path.join(__dirname, 'src', 'data', 'isl-course-data-v8.json'),
  path.join(__dirname, 'client', 'src', 'data', 'isl-course-data-v10.json'),
  path.join(__dirname, 'client', 'src', 'data', 'isl-course-data-v8.json'),
];

console.log('Reading source file:', sourceFile);
const rawData = fs.readFileSync(sourceFile, 'utf8');
const data = JSON.parse(rawData);

const PLAYLIST_ID = "PLHhpObfAQ1ss";
if (data.course_metadata) {
  data.course_metadata.playlist_url = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
}

let totalLessons = 0;
if (Array.isArray(data.modules)) {
  data.modules.forEach((module) => {
    if (Array.isArray(module.lessons)) {
      module.lessons.forEach((lesson) => {
        totalLessons++;
        const num = lesson.video_number || totalLessons;
        const embedIdx = num - 1;

        // Clean & exact YouTube embed & watch URLs for playlist PLHhpObfAQ1ss
        lesson.video_url = `https://www.youtube.com/watch?list=${PLAYLIST_ID}&index=${num}`;
        lesson.embed_url = `https://www.youtube.com/embed?listType=playlist&list=${PLAYLIST_ID}&index=${embedIdx}`;
      });
    }
  });
}

console.log(`Processed ${totalLessons} lessons across modules.`);

targetFiles.forEach((target) => {
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(target, JSON.stringify(data, null, 4), 'utf8');
  console.log('Successfully written to:', target);
});

console.log('All files updated cleanly!');
