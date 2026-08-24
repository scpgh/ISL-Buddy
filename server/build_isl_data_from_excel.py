import zipfile
import xml.etree.ElementTree as ET
import json
import os
import re

xlsx_path = "e:/ISL_project/server/isl_main_course.xlsx"
v8_path = "e:/ISL_project/server/isl-course-data-v8.json"

# 1. Parse Excel mapping
excel_mapping = {}

with zipfile.ZipFile(xlsx_path, 'r') as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        ss_xml = z.read('xl/sharedStrings.xml')
        root = ET.fromstring(ss_xml)
        ns = {'a': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        for si in root.findall('.//a:si', ns):
            text_parts = [t.text for t in si.findall('.//a:t', ns) if t.text]
            shared_strings.append("".join(text_parts))

    sheet_xml = z.read('xl/worksheets/sheet1.xml')
    s_root = ET.fromstring(sheet_xml)
    s_ns = {'a': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

    for row in s_root.findall('.//a:row', s_ns):
        cells = row.findall('./a:c', s_ns)
        if len(cells) >= 2:
            c1, c2 = cells[0], cells[1]
            
            # Code / Video Num
            val1 = None
            v1_tag = c1.find('a:v', s_ns)
            if v1_tag is not None and v1_tag.text:
                if c1.attrib.get('t') == 's':
                    val1 = shared_strings[int(v1_tag.text)]
                else:
                    val1 = v1_tag.text
            
            # URL
            val2 = None
            v2_tag = c2.find('a:v', s_ns)
            if v2_tag is not None and v2_tag.text:
                if c2.attrib.get('t') == 's':
                    val2 = shared_strings[int(v2_tag.text)]
                else:
                    val2 = v2_tag.text

            if val1 and val2 and val2.startswith('http'):
                # Normalize key
                val1_str = str(val1).strip()
                if val1_str == '1' or val1_str == '1.0':
                    key = '0' # Guideline
                else:
                    # e.g., 1.1000000000000001 -> 1.1, 2.2000000000000002 -> 2.2, 2.2999999999999998 -> 2.3
                    try:
                        f_val = float(val1_str)
                        key = f"{f_val:.1f}"
                    except:
                        key = val1_str
                excel_mapping[key] = val2.strip()

print("Excel Mapping Parsed:", json.dumps(excel_mapping, indent=2))

# 2. Read v8 course data
with open(v8_path, 'r', encoding='utf-8') as f:
    course_v8 = json.load(f)

MODULE_HINDI_MAP = {
  1: {
    "title": "मॉड्यूल 1: ISL में बातचीत शुरू करना",
    "desc": "भारतीय सांकेतिक भाषा में सम्मानजनक बातचीत शुरू करने के लिए बुनियादी शिष्टाचार, बधाई और अभिवादन सीखें।"
  },
  2: {
    "title": "मॉड्यूल 2: संचार की मूल बातें और आत्म-परिचय",
    "desc": "दो हाथों से वर्णमाला की हिज्जे (Fingerspelling), नाम बताने और अपनी भावनाओं को व्यक्त करने में महारत हासिल करें।"
  },
  3: {
    "title": "मॉड्यूल 3: दैनिक जीवन और आसपास का परिवेश",
    "desc": "पारिवारिक रिश्ते, भोजन के सामान और दैनिक दिनचर्या को सांकेतिक भाषा में व्यक्त करना सीखें।"
  },
  4: {
    "title": "मॉड्यूल 4: वस्तुओं का विवरण, संख्याएँ और समय",
    "desc": "वस्तुओं के आकार, 100 तक की संख्याएँ, दिन और समय से जुड़े संकेत सीखें।"
  },
  5: {
    "title": "मॉड्यूल 5: कार्यस्थल, शिक्षा और उन्नत ISL व्याकरण",
    desc: "स्कूल, कार्यालय, पेशे और Subject-Object-Verb (SOV) वाक्य संरचना के नियम सीखें।"
  },
  6: {
    "title": "मॉड्यूल 6: प्रकृति, पर्यावरण और पशु-पक्षी",
    "desc": "मौसम, प्राकृतिक तत्व, जानवरों और पक्षियों के विशिष्ट संकेतों का अभ्यास करें।"
  },
  7: {
    "title": "मॉड्यूल 7: स्वास्थ्य, चिकित्सा और आपातकालीन स्थिति",
    "desc": "शारीरिक अंग, बीमारी, डॉक्टर और आपातकालीन SOS संकेतों में महारत हासिल करें।"
  },
  8: {
    "title": "मॉड्यूल 8: यात्रा, वाहन और दिशा-निर्देश",
    "desc": "यातायात के साधन, दिशा-निर्देश और स्थानों से जुड़े सांकेतिक संकेत सीखें।"
  },
  9: {
    "title": "मॉड्यूल 9: भावनाएँ, विचार और सामाजिक संवाद",
    "desc": "अपनी गहरी भावनाओं, विचारों और सामाजिक चर्चाओं को प्रभावी ढंग से व्यक्त करें।"
  },
  10: {
    "title": "मॉड्यूल 10: ISLRTC उन्नत समीक्षा और प्रमाणन",
    "desc": "संपूर्ण पाठ्यक्रम की समीक्षा, कठिन वाक्य संरचना और परीक्षा की तैयारी।"
  }
}

isl_units = []
for m in course_v8["modules"]:
    hindiInfo = MODULE_HINDI_MAP.get(m["module_id"], {"title": m["module_name"], "desc": m["description"]})
    isl_units.append({
        "id": f"module-{m['module_id']}",
        "title": m["module_name"],
        "titleHindi": hindiInfo["title"],
        "description": m["description"],
        "descriptionHindi": hindiInfo["desc"],
        "color": "bg-[#58cc02]" if m["module_id"] % 3 == 1 else "bg-[#1cb0f6]" if m["module_id"] % 3 == 2 else "bg-[#ffc800]",
        "icon": "🤟"
    })

phrases_array = []

# Guideline Video 0 (Excel key '0' -> https://youtu.be/5PF6JXzYyUI)
guideline_url = excel_mapping.get('0', 'https://youtu.be/5PF6JXzYyUI')
guideline_yt_id = guideline_url.split('/')[-1]

guideline_lesson = {
  "id": "lesson-node-0",
  "unitId": "module-1",
  "levelNumber": 0,
  "topicCode": "0",
  "english": "Guideline: Course Overview & Introduction to ISL",
  "hindi": "दिशानिर्देश: भारतीय सांकेतिक भाषा का परिचय एवं अवलोकन",
  "category": "Module 1: Initiating Conversation in ISL",
  "categoryHindi": MODULE_HINDI_MAP[1]["title"],
  "videoUrlEnglish": f"https://www.youtube.com/embed/{guideline_yt_id}",
  "sourceUrl": guideline_url,
  "islSyntax": "ISLRTC GUIDELINE • INTRODUCTION TO ISL",
  "explanation": "Welcome to the official Government of India ISLRTC Basic Indian Sign Language Course. Watch this guideline orientation video to understand course structure, 3D signing space, and core visual etiquette.",
  "theory": "This guideline orientation video introduces the Indian Sign Language Research and Training Centre (ISLRTC) self-learning curriculum, 3D chest signing space, non-manual facial signals, and two-handed fingerspelling fundamentals.",
  "theoryHindi": "यह दिशानिर्देश परिचय वीडियो भारतीय सांकेतिक भाषा अनुसंधान और प्रशिक्षण केंद्र (ISLRTC) के पाठ्यक्रम, 3D सांकेतिक स्थान, चेहरे के भावों और दोनों हाथों से हिज्जे करने की बुनियादी बातों को समझाता है।",
  "practiceInstructions": [
    "Step 1: Watch the complete ISL course guideline video.",
    "Step 2: Note down your dominant active hand position at chest height.",
    "Step 3: Proceed to Lesson 1.1 to begin your first hands-on gesture drill!"
  ],
  "practiceInstructionsHindi": [
    "चरण 1: संपूर्ण ISL पाठ्यक्रम दिशानिर्देश वीडियो को ध्यान से देखें।",
    "चरण 2: छाती की ऊंचाई पर अपने सक्रिय मुख्य हाथ की स्थिति पर ध्यान दें।",
    "चरण 3: अपना पहला अभ्यास शुरू करने के लिए पाठ 1.1 पर आगे बढ़ें!"
  ],
  "vocabulary": ["Guideline", "Overview", "ISLRTC", "Deaf Culture", "3D Space"],
  "tips": "Ensure you are seated comfortably with good lighting for 3D chest space visibility.",
  "tipsHindi": "सांकेतिक अभ्यास के लिए अच्छी रोशनी और आरामदायक मुद्रा बनाए रखें।",
  "type": "video-choice"
}

phrases_array.append(guideline_lesson)

# 40 Lessons from v8 matching excel_mapping
for m in course_v8["modules"]:
    if "lessons" in m and isinstance(m["lessons"], list):
        for l in m["lessons"]:
            num = l.get("video_number")
            topicCode = l.get("topic_code", f"{m['module_id']}.{num}")

            # Get video URL from excel_mapping
            exact_url = excel_mapping.get(topicCode, l.get("video_url"))
            if not exact_url:
                exact_url = f"https://www.youtube.com/watch?list=PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6&index={num}"
            
            yt_id = exact_url.split('/')[-1].replace('watch?v=', '').split('&')[0]
            embed_url = f"https://www.youtube.com/embed/{yt_id}"

            cleanEngTitle = l.get("lesson_title", "").replace("Lesson ", "")
            hindiTitle = f"पाठ {topicCode}: {cleanEngTitle}"

            phrases_array.append({
                "id": f"lesson-node-{num}",
                "unitId": f"module-{m['module_id']}",
                "levelNumber": num,
                "topicCode": topicCode,
                "english": l.get("lesson_title", f"Lesson {topicCode}"),
                "hindi": hindiTitle,
                "category": m["module_name"],
                "categoryHindi": MODULE_HINDI_MAP.get(m["module_id"], {}).get("title", m["module_name"]),
                "videoUrlEnglish": embed_url,
                "sourceUrl": exact_url,
                "islSyntax": f"ISLRTC LESSON {topicCode} • {m['module_name'].upper()}",
                "explanation": l.get("theory", f"Lesson {topicCode} of the official ISLRTC ISL Course."),
                "theory": l.get("theory"),
                "theoryHindi": l.get("theory"),
                "practiceInstructions": l.get("practical_instructions", [
                    "Step 1: Position dominant active hand at chest height in 3D signing space.",
                    "Step 2: Practice handshape transition matching the video presenter.",
                    "Step 3: Repeat the physical drill 5 times along with the video playback."
                ]),
                "practiceInstructionsHindi": [
                    "चरण 1: अपने मुख्य हाथ को छाती की ऊंचाई पर 3D सांकेतिक क्षेत्र में रखें।",
                    "चरण 2: वीडियो में दिखाए गए हाथों के आकार का सावधानीपूर्वक अभ्यास करें।",
                    "चरण 3: वीडियो प्लेबैक के साथ 5 बार इस अभ्यास को दोहराएं।"
                ],
                "vocabulary": l.get("vocabulary", []),
                "tips": "Maintain dominant active hand at chest height in 3D signing space with clear facial markers.",
                "tipsHindi": "हमेशा चेहरे पर सकारात्मक भाव बनाए रखें और हाथों के संकेतों को छाती के सामने स्पष्ट रूप से करें।",
                "type": "video-choice"
            })

file_content = f"""export const ISL_UNITS = {json.dumps(isl_units, indent=2)};

export const ISL_PHRASES = {json.dumps(phrases_array, indent=2)};
"""

for target in [r"e:\ISL_project\client\src\data\islData.js", r"e:\ISL_project\src\data\islData.js"]:
    if os.path.exists(target):
        with open(target, "w", encoding="utf-8") as out:
            out.write(file_content)
        print(f"Successfully written PERECT isl_main_course.xlsx video URLs to: {target}")
