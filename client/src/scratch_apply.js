import fs from 'node:fs';

const excelData = JSON.parse(fs.readFileSync('e:/ISL_project/client/src/excel_data.json', 'utf8'));

// Extract title -> link map from excel_data.json
const titleToLink = {};
excelData.rows.forEach(r => {
  if (r.cellList && r.cellList.length >= 2) {
    const title = r.cellList[0].val.trim();
    const link = r.cellList[1].val.trim();
    if (title && link && title !== 'Title') {
      titleToLink[title.toLowerCase()] = link;
    }
  }
});

console.log('Title to Link map size:', Object.keys(titleToLink).length);

function getVid(url) {
  const m = url.match(/shorts\/([a-zA-Z0-9_-]+)/) || url.match(/v=([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

// 1. Update ActionLibrary.jsx files
const libFiles = [
  'e:/ISL_project/client/src/components/ActionLibrary.jsx',
  'e:/ISL_project/src/components/ActionLibrary.jsx'
];

libFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace each item block
    content = content.replace(/\{\s*id:\s*(\d+),\s*videoIndex:\s*(\d+),\s*title:\s*"([^"]+)"[\s\S]*?\n\s*\},/g, (block, id, idx, title) => {
      const tLower = title.toLowerCase();
      let matchedLink = null;
      
      // Match exact title or substring
      for (const [key, link] of Object.entries(titleToLink)) {
        if (tLower.includes(key) || key.includes(tLower.split('/')[0].trim().toLowerCase())) {
          matchedLink = link;
          break;
        }
      }

      if (matchedLink) {
        const vId = getVid(matchedLink);
        if (vId) {
          const embedLink = `https://www.youtube.com/embed/${vId}`;
          const watchLink = `https://www.youtube.com/shorts/${vId}`;
          block = block.replace(/embedUrl:\s*"[^"]+"/, `embedUrl: "${embedLink}"`);
          block = block.replace(/watchUrl:\s*"[^"]+"/, `watchUrl: "${watchLink}"`);
        }
      }
      return block;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ActionLibrary file:', filePath);
  }
});

// 2. Update isl-course-data-v10 (1).json
const v10Path = 'e:/ISL_project/server/isl-course-data-v10 (1).json';
if (fs.existsSync(v10Path)) {
  const v10Data = JSON.parse(fs.readFileSync(v10Path, 'utf8'));
  let updatedCount = 0;

  v10Data.modules.forEach(m => {
    m.lessons.forEach(l => {
      const lTitle = l.lesson_title.toLowerCase();
      let matchedLink = null;

      for (const [key, link] of Object.entries(titleToLink)) {
        if (lTitle.includes(key)) {
          matchedLink = link;
          break;
        }
      }

      if (matchedLink) {
        const vId = getVid(matchedLink);
        if (vId) {
          l.embed_url = `https://www.youtube.com/embed/${vId}`;
          l.video_url = `https://www.youtube.com/shorts/${vId}`;
          updatedCount++;
        }
      }
    });
  });

  fs.writeFileSync(v10Path, JSON.stringify(v10Data, null, 4), 'utf8');
  console.log(`Updated ${updatedCount} lessons in isl-course-data-v10 (1).json`);
}
