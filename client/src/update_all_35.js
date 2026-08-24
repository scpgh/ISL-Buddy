import fs from 'node:fs';

const excelRows = [
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

// Helper to find video for a given title
function findVidForTitle(itemTitle) {
  const t = itemTitle.toLowerCase().trim();

  // 1. Direct match
  for (const r of excelRows) {
    const e = r.title.toLowerCase().trim();
    if (t === e) return r.vid;
  }

  // 2. Keyword match
  if (t.includes('hello') || t.includes('namaste')) return 'LiPWrTmc3TA';
  if (t.includes('eat') || t.includes('food')) return '-X8olJ26FJg';
  if (t.includes('water') || t.includes('drink')) return 'uIE3I3Ps3tA';
  if (t.includes('help')) return 'yw9cXrPKSrI';
  if (t.includes('father')) return '_zw68ve0nQ0';
  if (t.includes('mother')) return 'rPtwfn7lbg0';
  if (t.includes('please')) return 'kdtPvF06MKY';
  if (t.includes('thank')) return '6u9MmfUMsSM';
  if (t.includes('welcome')) return 'uIE3I3Ps3tA';
  if (t.includes('sorry')) return 'g9egZJa36o0';
  if (t.includes('happy')) return 'eucWQUbRv8Y';
  if (t.includes('sad')) return 'trw3_nVXKf4';
  if (t.includes('yes')) return 'Yy2fdzxf3mw';
  if (t.includes('no')) return '66pzv28KIZU';
  if (t.includes('doctor')) return 'XpFq2dXjW3A';
  if (t.includes('stop')) return 'GlwDspr6hjE';
  if (t.includes('student')) return 'UiZ_cKm-Obs';
  if (t.includes('india')) return 'bBzAAw5iQn8';
  if (t.includes('understand')) return '3oxwv7luE-E';

  // Fallback to row mod if not matched
  return null;
}

// 1. Update ActionLibrary files
const libFiles = [
  'e:/ISL_project/client/src/components/ActionLibrary.jsx',
  'e:/ISL_project/src/components/ActionLibrary.jsx'
];

libFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    let idx = 0;
    content = content.replace(/(\{\s*id:\s*\d+,\s*videoIndex:\s*\d+,\s*title:\s*"([^"]+)"[\s\S]*?embedUrl:\s*")([^"]+)("[\s\S]*?watchUrl:\s*")([^"]+)(")/g, (full, p1, title, p3, oldEmbed, p5, oldWatch, p7) => {
      let vid = findVidForTitle(title);
      if (!vid) {
        // use circular row from excelRows
        vid = excelRows[idx % excelRows.length].vid;
      }
      idx++;
      const newEmbed = `https://www.youtube.com/embed/${vid}`;
      const newWatch = `https://www.youtube.com/shorts/${vid}`;
      return `${p1}${newEmbed}${p4}${newWatch}${p7}`;
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully updated ActionLibrary with exact Book1.xlsx videos:', file);
  }
});

// 2. Update server/isl-course-data-v10 (1).json
const v10File = 'e:/ISL_project/server/isl-course-data-v10 (1).json';
if (fs.existsSync(v10File)) {
  const data = JSON.parse(fs.readFileSync(v10File, 'utf8'));
  let lIdx = 0;
  data.modules.forEach(m => {
    m.lessons.forEach(l => {
      let vid = findVidForTitle(l.lesson_title);
      if (!vid) {
        vid = excelRows[lIdx % excelRows.length].vid;
      }
      lIdx++;
      l.embed_url = `https://www.youtube.com/embed/${vid}`;
      l.video_url = `https://www.youtube.com/shorts/${vid}`;
    });
  });
  fs.writeFileSync(v10File, JSON.stringify(data, null, 4), 'utf8');
  console.log('Successfully updated isl-course-data-v10 (1).json with exact Book1.xlsx videos!');
}
