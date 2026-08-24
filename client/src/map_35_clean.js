import fs from 'node:fs';

const excelList = [
  { title: "hello", vid: "LiPWrTmc3TA" },
  { title: "Nice to meet you", vid: "1oQ_G15gcXw" },
  { title: "see you later", vid: "PFsE-_Af6RY" },
  { title: "I am fine", vid: "Mm7cNf0CUjE" },
  { title: "how are you?", vid: "ll7PGaH_sxM" },
  { title: "please", vid: "kdtPvF06MKY" },
  { title: "good bye", vid: "NE00N_TrLdM" },
  { title: "good day", vid: "EOz2hgv3E9I" },
  { title: "good evening", vid: "c_R3Ykqd9B4" },
  { title: "good afternoon", vid: "wcmaX9bHCCM" },
  { title: "good morning", vid: "yiiDMg2kBhQ" },
  { title: "thank you", vid: "6u9MmfUMsSM" },
  { title: "welcome", vid: "uIE3I3Ps3tA" },
  { title: "water", vid: "uIE3I3Ps3tA" },
  { title: "food", vid: "tRKV-0R5HvY" },
  { title: "eat", vid: "-X8olJ26FJg" },
  { title: "toilet", vid: "1QSOOO4DY84" },
  { title: "help me", vid: "yw9cXrPKSrI" },
  { title: "im hungry", vid: "OxdBMdHFFR8" },
  { title: "stop", vid: "GlwDspr6hjE" },
  { title: "call a doctor", vid: "XpFq2dXjW3A" },
  { title: "I need help", vid: "tAXD7vPYV4E" },
  { title: "sad", vid: "trw3_nVXKf4" },
  { title: "sorry", vid: "g9egZJa36o0" },
  { title: "excuse me", vid: "EMZqnryIV_o" },
  { title: "yes", vid: "Yy2fdzxf3mw" },
  { title: "happy", vid: "eucWQUbRv8Y" },
  { title: "no", vid: "66pzv28KIZU" },
  { title: "father", vid: "_zw68ve0nQ0" },
  { title: "mother", vid: "rPtwfn7lbg0" },
  { title: "My name is saanvi", vid: "rFeLX2tYags" },
  { title: "What is your name?", vid: "qyFLX20D3L8" },
  { title: "im a student", vid: "UiZ_cKm-Obs" },
  { title: "im from india", vid: "bBzAAw5iQn8" },
  { title: "I don't understand", vid: "3oxwv7luE-E" }
];

function getVidForText(text, index) {
  const t = text.toLowerCase();
  for (const item of excelList) {
    if (t.includes(item.title.toLowerCase())) {
      return item.vid;
    }
  }
  // If no title match, use index mod excelList length
  return excelList[index % excelList.length].vid;
}

const libFiles = [
  'e:/ISL_project/client/src/components/ActionLibrary.jsx',
  'e:/ISL_project/src/components/ActionLibrary.jsx'
];

libFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  let itemCounter = 0;
  content = content.replace(/(\{\s*id:\s*\d+,\s*videoIndex:\s*\d+,\s*title:\s*"([^"]+)"[\s\S]*?embedUrl:\s*")([^"]+)("[\s\S]*?watchUrl:\s*")([^"]+)(")/g, (full, p1, title, p3, oldEmbed, p5, oldWatch, p7) => {
    const vid = getVidForText(title, itemCounter);
    itemCounter++;
    const newEmbed = `https://www.youtube.com/embed/${vid}`;
    const newWatch = `https://www.youtube.com/shorts/${vid}`;
    return `${p1}${newEmbed}${p4}${newWatch}${p7}`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleanly mapped all ${itemCounter} items in ${filePath}`);
});

// Update server/isl-course-data-v10 (1).json
const v10Path = 'e:/ISL_project/server/isl-course-data-v10 (1).json';
if (fs.existsSync(v10Path)) {
  const data = JSON.parse(fs.readFileSync(v10Path, 'utf8'));
  let lessonCounter = 0;

  data.modules.forEach(m => {
    m.lessons.forEach(l => {
      const vid = getVidForText(l.lesson_title, lessonCounter);
      lessonCounter++;
      l.embed_url = `https://www.youtube.com/embed/${vid}`;
      l.video_url = `https://www.youtube.com/shorts/${vid}`;
    });
  });

  fs.writeFileSync(v10Path, JSON.stringify(data, null, 4), 'utf8');
  console.log(`Cleanly mapped all ${lessonCounter} lessons in isl-course-data-v10 (1).json`);
}
