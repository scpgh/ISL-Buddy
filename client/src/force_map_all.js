import fs from 'node:fs';

const vids = [
  "LiPWrTmc3TA", "1oQ_G15gcXw", "PFsE-_Af6RY", "Mm7cNf0CUjE", "ll7PGaH_sxM",
  "kdtPvF06MKY", "NE00N_TrLdM", "EOz2hgv3E9I", "c_R3Ykqd9B4", "wcmaX9bHCCM",
  "yiiDMg2kBhQ", "6u9MmfUMsSM", "uIE3I3Ps3tA", "uIE3I3Ps3tA", "tRKV-0R5HvY",
  "-X8olJ26FJg", "1QSOOO4DY84", "yw9cXrPKSrI", "OxdBMdHFFR8", "GlwDspr6hjE",
  "XpFq2dXjW3A", "tAXD7vPYV4E", "trw3_nVXKf4", "g9egZJa36o0", "EMZqnryIV_o",
  "Yy2fdzxf3mw", "eucWQUbRv8Y", "66pzv28KIZU", "_zw68ve0nQ0", "rPtwfn7lbg0",
  "rFeLX2tYags", "qyFLX20D3L8", "UiZ_cKm-Obs", "bBzAAw5iQn8", "3oxwv7luE-E"
];

const titleMap = {
  "hello": "LiPWrTmc3TA",
  "eat": "-X8olJ26FJg",
  "drink": "uIE3I3Ps3tA",
  "water": "uIE3I3Ps3tA",
  "sleep": "trw3_nVXKf4",
  "read": "UiZ_cKm-Obs",
  "write": "rFeLX2tYags",
  "run": "GlwDspr6hjE",
  "walk": "EOz2hgv3E9I",
  "stand": "3oxwv7luE-E",
  "sit": "Mm7cNf0CUjE",
  "help": "yw9cXrPKSrI",
  "father": "_zw68ve0nQ0",
  "mother": "rPtwfn7lbg0",
  "please": "kdtPvF06MKY",
  "thank": "6u9MmfUMsSM",
  "welcome": "uIE3I3Ps3tA",
  "sorry": "g9egZJa36o0",
  "yes": "Yy2fdzxf3mw",
  "no": "66pzv28KIZU",
  "happy": "eucWQUbRv8Y",
  "sad": "trw3_nVXKf4",
  "food": "tRKV-0R5HvY",
  "toilet": "1QSOOO4DY84",
  "hungry": "OxdBMdHFFR8",
  "stop": "GlwDspr6hjE",
  "doctor": "XpFq2dXjW3A",
  "student": "UiZ_cKm-Obs",
  "india": "bBzAAw5iQn8"
};

const libFiles = [
  'e:/ISL_project/client/src/components/ActionLibrary.jsx',
  'e:/ISL_project/src/components/ActionLibrary.jsx'
];

libFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let lines = fs.readFileSync(file, 'utf8').split('\n');

  let currentTitle = "";
  let itemIdx = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const titleMatch = line.match(/title:\s*"([^"]+)"/);
    if (titleMatch) {
      currentTitle = titleMatch[1].toLowerCase();
    }

    if (line.includes('embedUrl:')) {
      let chosenVid = null;
      for (const [key, v] of Object.entries(titleMap)) {
        if (currentTitle.includes(key)) {
          chosenVid = v;
          break;
        }
      }
      if (!chosenVid) {
        chosenVid = vids[itemIdx % vids.length];
      }
      itemIdx++;
      lines[i] = line.replace(/embedUrl:\s*"[^"]+"/, `embedUrl: "https://www.youtube.com/embed/${chosenVid}"`);
    }

    if (line.includes('watchUrl:')) {
      let chosenVid = null;
      for (const [key, v] of Object.entries(titleMap)) {
        if (currentTitle.includes(key)) {
          chosenVid = v;
          break;
        }
      }
      if (!chosenVid) {
        chosenVid = vids[(itemIdx - 1) % vids.length];
      }
      lines[i] = line.replace(/watchUrl:\s*"[^"]+"/, `watchUrl: "https://www.youtube.com/shorts/${chosenVid}"`);
    }
  }

  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log(`Updated ${itemIdx} items in ${file}`);
});

// Also update isl-course-data-v10 (1).json
const v10File = 'e:/ISL_project/server/isl-course-data-v10 (1).json';
if (fs.existsSync(v10File)) {
  const data = JSON.parse(fs.readFileSync(v10File, 'utf8'));
  let count = 0;
  data.modules.forEach(m => {
    m.lessons.forEach(l => {
      const t = l.lesson_title.toLowerCase();
      let chosenVid = null;
      for (const [key, v] of Object.entries(titleMap)) {
        if (t.includes(key)) {
          chosenVid = v;
          break;
        }
      }
      if (!chosenVid) {
        chosenVid = vids[count % vids.length];
      }
      count++;
      l.embed_url = `https://www.youtube.com/embed/${chosenVid}`;
      l.video_url = `https://www.youtube.com/shorts/${chosenVid}`;
    });
  });

  fs.writeFileSync(v10File, JSON.stringify(data, null, 4), 'utf8');
  console.log(`Updated all ${count} lessons in ${v10File}`);
}
