import fs from 'node:fs';

const files = [
  'e:/ISL_project/client/src/components/ActionLibrary.jsx',
  'e:/ISL_project/src/components/ActionLibrary.jsx'
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Clean titleHindi in ACTION_SIGNS_DATA
  content = content.replace(/"titleHindi":\s*"([^"]+)"/g, (match, p1) => {
    const cleaned = p1.replace(/\s*\([^)]*\)/g, '').trim();
    return `"titleHindi": "${cleaned}"`;
  });

  // 2. Remove card header numbering span
  content = content.replace(/<span className="text-\[11px\] font-mono font-bold text-\[#afafaf\]">\s*#\{item\.id\} of \{ACTION_SIGNS_DATA\.length\}\s*<\/span>/g, '');

  // 3. Update category rendering to use isHindi
  content = content.replace(
    /\{item\.category\}/g,
    '{isHindi ? (item.categoryHindi || item.category) : item.category}'
  );

  // 4. Clean modal top category text (remove ACTION SIGN #... OF ...)
  content = content.replace(
    /ACTION SIGN #\{activeItemModal\.id\} OF \{ACTION_SIGNS_DATA\.length\} • \{activeItemModal\.category\}/g,
    '{isHindi ? (activeItemModal.categoryHindi || activeItemModal.category) : activeItemModal.category}'
  );

  // 5. Update Watch button text (remove Video #...)
  content = content.replace(
    /<span>▶ Watch "\\\$\{activeItemModal\.title\}" Video #\{activeItemModal\.videoIndex \|\| 1\} on YouTube<\/span>/g,
    `<span>{isHindi ? '▶ यूट्यूब पर वीडियो देखें' : \`▶ Watch "\${activeItemModal.title}" on YouTube\`}</span>`
  );
  content = content.replace(
    /<span>▶ Watch "\\\$\{activeItemModal\.title\}" on YouTube<\/span>/g,
    `<span>{isHindi ? '▶ यूट्यूब पर वीडियो देखें' : \`▶ Watch "\${activeItemModal.title}" on YouTube\`}</span>`
  );

  // 6. Update card Details button text
  content = content.replace(
    /<span>Details & Video<\/span>/g,
    `<span>{isHindi ? 'विवरण और वीडियो' : 'Details & Video'}</span>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned numbering and bilingual switching in ${filePath}`);
});
