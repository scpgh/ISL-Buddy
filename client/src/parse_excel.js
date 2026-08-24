import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

try {
  const excelPath = 'e:/ISL_project/server/Book1.xlsx';
  const outPath = 'e:/ISL_project/client/src/excel_data.json';

  if (fs.existsSync(excelPath)) {
    const buf = fs.readFileSync(excelPath);
    
    // Zip reader for node
    const files = {};
    let i = 0;
    while (i < buf.length - 30) {
      if (buf.readUInt32LE(i) === 0x04034b50) {
        const compression = buf.readUInt16LE(i + 8);
        const compressedSize = buf.readUInt32LE(i + 18);
        const nameLen = buf.readUInt16LE(i + 26);
        const extraLen = buf.readUInt16LE(i + 28);
        const name = buf.toString('utf8', i + 30, i + 30 + nameLen);
        const dataStart = i + 30 + nameLen + extraLen;
        const compData = buf.slice(dataStart, dataStart + compressedSize);
        
        let fileData = null;
        if (compression === 0) {
          fileData = compData;
        } else if (compression === 8) {
          try {
            fileData = zlib.inflateRawSync(compData);
          } catch (e) {}
        }
        if (fileData) {
          files[name] = fileData.toString('utf8');
        }
        i = dataStart + compressedSize;
      } else {
        i++;
      }
    }

    // Extract shared strings
    const sharedStrings = [];
    if (files['xl/sharedStrings.xml']) {
      const ssContent = files['xl/sharedStrings.xml'];
      const regex = /<t[^>]*>(.*?)<\/t>/gs;
      let match;
      while ((match = regex.exec(ssContent)) !== null) {
        sharedStrings.push(match[1]);
      }
    }

    // Extract relationships (hyperlinks target URLs)
    const relMap = {};
    if (files['xl/worksheets/_rels/sheet1.xml.rels']) {
      const relContent = files['xl/worksheets/_rels/sheet1.xml.rels'];
      const regex = /Id="(rId\d+)"[^>]*Target="([^"]+)"/g;
      let match;
      while ((match = regex.exec(relContent)) !== null) {
        relMap[match[1]] = match[2];
      }
    }

    // Extract sheet1
    const rows = [];
    if (files['xl/worksheets/sheet1.xml']) {
      const sheetContent = files['xl/worksheets/sheet1.xml'];
      const hlMap = {};
      const hlRegex = /<hyperlink[^>]*ref="([^"]+)"[^>]*r:id="([^"]+)"/g;
      let match;
      while ((match = hlRegex.exec(sheetContent)) !== null) {
        if (relMap[match[2]]) {
          hlMap[match[1]] = relMap[match[2]];
        }
      }

      // Also match inline target/location hyperlinks
      const hlRegex2 = /<hyperlink[^>]*ref="([^"]+)"[^>]*location="([^"]+)"/g;
      while ((match = hlRegex2.exec(sheetContent)) !== null) {
        hlMap[match[1]] = match[2];
      }

      // Row matching
      const rowRegex = /<row[^>]*r="(\d+)"[^>]*>(.*?)<\/row>/gs;
      let rMatch;
      while ((rMatch = rowRegex.exec(sheetContent)) !== null) {
        const rowNum = rMatch[1];
        const rowBody = rMatch[2];
        const cellRegex = /<c[^>]*r="([A-Z]+\d+)"(?:[^>]*t="([^"]+)")?[^>]*>(?:<v>(.*?)<\/v>)?/gs;
        let cMatch;
        const cellList = [];
        while ((cMatch = cellRegex.exec(rowBody)) !== null) {
          const ref = cMatch[1];
          const type = cMatch[2];
          let val = cMatch[3] || "";
          if (type === 's' && sharedStrings[parseInt(val, 10)]) {
            val = sharedStrings[parseInt(val, 10)];
          }
          const link = hlMap[ref] || "";
          cellList.append ? cellList.append({ ref, val, link }) : cellList.push({ ref, val, link });
        }
        rows.push({ rowNum, cellList });
      }
    }

    const outputData = { sharedStrings, relMap, rows };
    fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf8');
    console.log('SUCCESSFULLY PARSED Book1.xlsx! Saved to:', outPath);
  }
} catch (err) {
  console.error('Error parsing Book1.xlsx:', err);
}
