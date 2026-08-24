import fs from 'node:fs';

const videoMap = {
  "hello": "LiPWrTmc3TA",
  "nice to meet you": "1oQ_G15gcXw",
  "see you later": "PFsE-_Af6RY",
  "i am fine": "Mm7cNf0CUjE",
  "how are you": "ll7PGaH_sxM",
  "please": "kdtPvF06MKY",
  "good bye": "NE00N_TrLdM",
  "good day": "EOz2hgv3E9I",
  "good evening": "c_R3Ykqd9B4",
  "good afternoon": "wcmaX9bHCCM",
  "good morning": "yiiDMg2kBhQ",
  "thank you": "6u9MmfUMsSM",
  "welcome": "uIE3I3Ps3tA",
  "water": "uIE3I3Ps3tA",
  "food": "tRKV-0R5HvY",
  "eat": "-X8olJ26FJg",
  "toilet": "1QSOOO4DY84",
  "help me": "yw9cXrPKSrI",
  "help": "yw9cXrPKSrI",
  "im hungry": "OxdBMdHFFR8",
  "hungry": "OxdBMdHFFR8",
  "stop": "GlwDspr6hjE",
  "call a doctor": "XpFq2dXjW3A",
  "doctor": "XpFq2dXjW3A",
  "i need help": "tAXD7vPYV4E",
  "sad": "trw3_nVXKf4",
  "sorry": "g9egZJa36o0",
  "excuse me": "EMZqnryIV_o",
  "yes": "Yy2fdzxf3mw",
  "happy": "eucWQUbRv8Y",
  "no": "66pzv28KIZU",
  "father": "_zw68ve0nQ0",
  "mother": "rPtwfn7lbg0",
  "my name is saanvi": "rFeLX2tYags",
  "what is your name": "qyFLX20D3L8",
  "im a student": "UiZ_cKm-Obs",
  "student": "UiZ_cKm-Obs",
  "im from india": "bBzAAw5iQn8",
  "india": "bBzAAw5iQn8",
  "i don't understand": "3oxwv7luE-E",
  "don't understand": "3oxwv7luE-E"
};

const libFiles = [
  'e:/ISL_project/client/src/components/ActionLibrary.jsx',
  'e:/ISL_project/src/components/ActionLibrary.jsx'
];

libFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/(\{\s*id:\s*\d+,\s*videoIndex:\s*\d+,\s*title:\s*"([^"]+)"[\s\S]*?embedUrl:\s*")([^"]+)("[\s\S]*?watchUrl:\s*")([^"]+)(")/g, (full, p1, title, p3, oldEmbed, p5, oldWatch, p7) => {
      const tLower = title.toLowerCase().trim();
      let vid = null;
      for (const [key, id] of Object.entries(videoMap)) {
        if (tLower === key || tLower.includes(key) || key.includes(tLower)) {
          vid = id;
          break;
        }
      }
      if (vid) {
        const newEmbed = `https://www.youtube.com/embed/${vid}`;
        const newWatch = `https://www.youtube.com/shorts/${vid}`;
        return `${p1}${newEmbed}${p4}${newWatch}${p7}`;
      }
      return full;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated ActionLibrary:', filePath);
  }
});

// Update server/isl-course-data-v10 (1).json
const v10Path = 'e:/ISL_project/server/isl-course-data-v10 (1).json';
if (fs.existsSync(v10Path)) {
  const data = JSON.parse(fs.readFileSync(v10Path, 'utf8'));
  let mappedCount = 0;

  data.modules.forEach(m => {
    m.lessons.forEach(l => {
      const titleLower = l.lesson_title.toLowerCase();
      let vid = null;

      for (const [key, id] of Object.entries(videoMap)) {
        if (titleLower.includes(key)) {
          vid = id;
          break;
        }
      }

      if (vid) {
        l.embed_url = `https://www.youtube.com/embed/${vid}`;
        l.video_url = `https://www.youtube.com/shorts/${vid}`;
        mappedCount++;
      }
    });
  });

  fs.writeFileSync(v10Path, JSON.stringify(data, null, 4), 'utf8');
  console.log(`Successfully mapped ${mappedCount} lessons in isl-course-data-v10 (1).json`);
}
