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
  
  if (!content.includes("const isHindi = userProgress?.appLanguage === 'hindi';")) {
    content = content.replace(
      "export default function ActionLibrary({ userProgress }) {",
      "export default function ActionLibrary({ userProgress }) {\n  const isHindi = userProgress?.appLanguage === 'hindi';"
    );
  }

  // 3. Update Card Title & Description
  content = content.replace(
    /<h3 className="font-black text-xl text-\[#4b4b4b\] dark:text-white group-hover:text-\[#1cb0f6\] transition-colors mb-1">\s*\{item\.title\}\s*<\/h3>\s*<p className="text-xs font-black text-\[#ffc800\] mb-3">\{item\.titleHindi\}<\/p>\s*<p className="text-xs text-\[#777\] dark:text-\[#a0a0a0\] font-medium line-clamp-2 mb-4">\s*\{item\.description\}\s*<\/p>/g,
    `<h3 className="font-black text-xl text-[#4b4b4b] dark:text-white group-hover:text-[#1cb0f6] transition-colors mb-2">
                {isHindi ? item.titleHindi : item.title}
              </h3>
              
              <p className="text-xs text-[#777] dark:text-[#a0a0a0] font-medium line-clamp-2 mb-4">
                {isHindi ? item.descriptionHindi : item.description}
              </p>`
  );

  // 4. Update Modal Header
  content = content.replace(
    /<h2 className="font-black text-2xl text-\[#4b4b4b\] dark:text-white mt-0\.5 flex items-center gap-2">\s*\{activeItemModal\.title\}\s*<\/h2>\s*<p className="text-xs font-black text-\[#ffc800\]">\{activeItemModal\.titleHindi\}<\/p>/g,
    `<h2 className="font-black text-2xl text-[#4b4b4b] dark:text-white mt-0.5 flex items-center gap-2">
                  {isHindi ? activeItemModal.titleHindi : activeItemModal.title}
                </h2>`
  );

  // 5. Update Modal Description Box
  content = content.replace(
    /📝 Description \/ विवरण:[\s\S]*?<p className="text-xs font-bold text-\[#4b4b4b\] dark:text-white leading-relaxed mb-1">\s*\{activeItemModal\.description\}\s*<\/p>\s*<p className="text-xs font-bold text-\[#ffc800\]">\s*\{activeItemModal\.descriptionHindi\}\s*<\/p>/g,
    `{isHindi ? '📝 विवरण:' : '📝 Description:'}
                </h4>
                <p className="text-xs font-bold text-[#4b4b4b] dark:text-white leading-relaxed">
                  {isHindi ? activeItemModal.descriptionHindi : activeItemModal.description}`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated language rendering in ${filePath}`);
});
