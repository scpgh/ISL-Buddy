import fs from 'node:fs';

const files = [
  'e:/ISL_project/client/src/components/ActionLibrary.jsx',
  'e:/ISL_project/src/components/ActionLibrary.jsx'
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove parenthetical English from titleHindi
  content = content.replace(/"titleHindi":\s*"([^"]+)"/g, (match, p1) => {
    const cleaned = p1.replace(/\s*\([^)]*\)/g, '').trim();
    return `"titleHindi": "${cleaned}"`;
  });

  // 2. Ensure signature accepts userProgress
  content = content.replace("export default function ActionLibrary() {", "export default function ActionLibrary({ userProgress }) {");

  // 3. Remove numbering span from card header
  content = content.replace(/<span className="text-\[11px\] font-mono font-bold text-\[#afafaf\]">\s*#\{item\.id\} of \{ACTION_SIGNS_DATA\.length\}\s*<\/span>/g, '');

  // 4. Remove numbering from modal header
  content = content.replace(/ACTION SIGN #\{activeItemModal\.id\} OF \{ACTION_SIGNS_DATA\.length\} • /g, '');

  // 5. Remove video index numbering from watch button text
  content = content.replace(/Video #\{activeItemModal\.videoIndex \|\| 1\} /g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully cleaned numbering and language in ${filePath}`);
});
