import zipfile
import xml.etree.ElementTree as ET
import json
import re

xlsx_path = "e:/ISL_project/server/isl_main_course.xlsx"

with zipfile.ZipFile(xlsx_path, 'r') as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        ss_xml = z.read('xl/sharedStrings.xml')
        root = ET.fromstring(ss_xml)
        ns = {'a': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        for si in root.findall('.//a:si', ns):
            text_parts = [t.text for t in si.findall('.//a:t', ns) if t.text]
            shared_strings.append("".join(text_parts))

    rels = {}
    if 'xl/worksheets/_rels/sheet1.xml.rels' in z.namelist():
        rel_xml = z.read('xl/worksheets/_rels/sheet1.xml.rels')
        r_root = ET.fromstring(rel_xml)
        r_ns = {'r': 'http://schemas.openxmlformats.org/package/2006/relationships'}
        for rel in r_root.findall('.//r:Relationship', r_ns):
            r_id = rel.attrib.get('Id')
            target = rel.attrib.get('Target')
            rels[r_id] = target

    sheet_xml = z.read('xl/worksheets/sheet1.xml')
    s_root = ET.fromstring(sheet_xml)
    s_ns = {
        'a': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }

    hyperlinks_map = {}
    for hl in s_root.findall('.//a:hyperlink', s_ns):
        ref = hl.attrib.get('ref')
        r_id = hl.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
        target = rels.get(r_id, '')
        hyperlinks_map[ref] = target

    parsed_rows = []
    for row in s_root.findall('.//a:row', s_ns):
        row_idx = row.attrib.get('r')
        cells = []
        for c in row.findall('./a:c', s_ns):
            c_ref = c.attrib.get('r')
            c_type = c.attrib.get('t')
            v_tag = c.find('a:v', s_ns)
            cell_val = None
            if v_tag is not None and v_tag.text is not None:
                val_str = v_tag.text
                if c_type == 's':
                    str_idx = int(val_str)
                    cell_val = shared_strings[str_idx] if str_idx < len(shared_strings) else val_str
                else:
                    cell_val = val_str
            
            link = hyperlinks_map.get(c_ref, None)
            cells.append({'ref': c_ref, 'val': cell_val, 'link': link})
        parsed_rows.append({'row': row_idx, 'cells': cells})

out_log = []
out_log.append(f"Total rows: {len(parsed_rows)}")

for r in parsed_rows:
    row_summary = [f"{c['ref']}: {c['val']}" for c in r['cells']]
    out_log.append(f"Row {r['row']}: {row_summary}")

with open("e:/ISL_project/server/raw_excel_dump.log", "w", encoding="utf-8") as out:
    out.write("\n".join(out_log))

print("Dumped all rows")
