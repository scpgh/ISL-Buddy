import React, { useState } from 'react';
import { Search, Play, Sparkles, CheckCircle2, ChevronRight, X, ExternalLink, Filter, Film, Hand, Layers, Video } from 'lucide-react';

export const ACTION_SIGNS_DATA = [
  {
    "id": 1,
    "videoIndex": 1,
    "title": "Hello / Namaste",
    "titleHindi": "नमस्ते / हैलो (Hello)",
    "category": "Greetings",
    "categoryHindi": "अभिवादन",
    "embedUrl": "https://www.youtube.com/embed/LiPWrTmc3TA",
    "watchUrl": "https://www.youtube.com/shorts/LiPWrTmc3TA",
    "description": "Raise dominant hand to chest or forehead level with flat open palm, or join both palms in Namaste gesture.",
    "descriptionHindi": "सीधी हथेली से हाथ हिलाएं या नम्रता से दोनों हाथ जोड़कर नमस्ते का संकेत करें।",
    "gestureTip": "Maintain friendly eye contact and a warm smiling expression.",
    "sovContext": "Used at the beginning of conversations to greet politely.",
    "handShape": "Flat Open Palm / Joined Namaste",
    "movement": "Gentle side-to-side wave or chest press"
  },
  {
    "id": 2,
    "videoIndex": 2,
    "title": "Nice To Meet You",
    "titleHindi": "आपसे मिलकर खुशी हुई (Nice to meet you)",
    "category": "Greetings",
    "categoryHindi": "अभिवादन",
    "embedUrl": "https://www.youtube.com/embed/1oQ_G15gcXw",
    "watchUrl": "https://www.youtube.com/shorts/1oQ_G15gcXw",
    "description": "Slide flat palm over chest into a gentle handshake gesture.",
    "descriptionHindi": "हथेली को छाती पर स्लाइड करके धीरे से हाथ मिलाने का संकेत करें।",
    "gestureTip": "Nod head slightly with a pleasant smile.",
    "sovContext": "Used after introductions in ISL.",
    "handShape": "Flat Palm to Clasp",
    "movement": "Forward meet and shake"
  },
  {
    "id": 3,
    "videoIndex": 3,
    "title": "See You Later",
    "titleHindi": "फिर मिलेंगे (See you later)",
    "category": "Greetings",
    "categoryHindi": "अभिवादन",
    "embedUrl": "https://www.youtube.com/embed/PFsE-_Af6RY",
    "watchUrl": "https://www.youtube.com/shorts/PFsE-_Af6RY",
    "description": "Point to eye with V-fingers and wave forward toward person.",
    "descriptionHindi": "V-उंगली से आंख की ओर इशारा करें और आगे हाथ हिलाएं।",
    "gestureTip": "Wave smoothly moving away from shoulder.",
    "sovContext": "Used at the conclusion of meeting someone.",
    "handShape": "V-Shape / Peace Sign to Open Palm",
    "movement": "Eye point then outward wave"
  },
  {
    "id": 4,
    "videoIndex": 4,
    "title": "I Am Fine",
    "titleHindi": "मैं ठीक हूँ (I am fine)",
    "category": "Communication",
    "categoryHindi": "संवाद",
    "embedUrl": "https://www.youtube.com/embed/Mm7cNf0CUjE",
    "watchUrl": "https://www.youtube.com/shorts/Mm7cNf0CUjE",
    "description": "Point to self then give a crisp thumbs up near chest level.",
    "descriptionHindi": "खुद की ओर इशारा करके छाती के पास थम्स-अप दिखाएं।",
    "gestureTip": "Nod head affirmatively while signing.",
    "sovContext": "Response to 'How are you?' in ISL.",
    "handShape": "Thumbs Up / Flat Chest Tap",
    "movement": "Upward firm tap"
  },
  {
    "id": 5,
    "videoIndex": 5,
    "title": "How Are You?",
    "titleHindi": "आप कैसे हैं? (How are you?)",
    "category": "Communication",
    "categoryHindi": "संवाद",
    "embedUrl": "https://www.youtube.com/embed/ll7PGaH_sxM",
    "watchUrl": "https://www.youtube.com/shorts/ll7PGaH_sxM",
    "description": "Hold curved open palms facing chest and rotate outward with raised eyebrows.",
    "descriptionHindi": "छाती के सामने दोनों मुड़ी हथेलियों को बाहर घुमाएं और भौहें उठाएं।",
    "gestureTip": "Must raise eyebrows as an inquiry facial expression.",
    "sovContext": "Grammatically placed at sentence end.",
    "handShape": "C-Shape to Open Upward Palms",
    "movement": "Outward rotational flip"
  },
  {
    "id": 6,
    "videoIndex": 6,
    "title": "Please",
    "titleHindi": "कृपया (Please)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/kdtPvF06MKY",
    "watchUrl": "https://www.youtube.com/shorts/kdtPvF06MKY",
    "description": "Place flat open palm on chest and rub in a gentle circular motion.",
    "descriptionHindi": "सीधी हथेली को छाती पर रखें और हल्के गोल आकार में घुमाएं।",
    "gestureTip": "Soft respectful facial expression.",
    "sovContext": "Used before making any polite request.",
    "handShape": "Flat Open Palm",
    "movement": "Circular chest rub"
  },
  {
    "id": 7,
    "videoIndex": 7,
    "title": "Good Bye",
    "titleHindi": "अलविदा / बाय (Good bye)",
    "category": "Greetings",
    "categoryHindi": "अभिवादन",
    "embedUrl": "https://www.youtube.com/embed/NE00N_TrLdM",
    "watchUrl": "https://www.youtube.com/shorts/NE00N_TrLdM",
    "description": "Open and close fingers of raised hand facing outward.",
    "descriptionHindi": "उठे हाथ की उंगलियों को खोलें और बंद करें।",
    "gestureTip": "Warm farewell smile.",
    "sovContext": "Terminal greeting upon departure.",
    "handShape": "Open Palm to Flat Fist",
    "movement": "Waving palm flex"
  },
  {
    "id": 8,
    "videoIndex": 8,
    "title": "Good Day",
    "titleHindi": "आपका दिन शुभ हो (Good day)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/EOz2hgv3E9I",
    "watchUrl": "https://www.youtube.com/shorts/EOz2hgv3E9I",
    "description": "Sign 'Good' with thumbs up then arc arm from shoulder to represent sun path.",
    "descriptionHindi": "थम्स-अप से 'गुड' दिखाएं फिर हाथ से सूरज का चाप बनाएं।",
    "gestureTip": "Smooth steady arch overhead.",
    "sovContext": "Well-wishing phrase.",
    "handShape": "Thumbs Up to Sun Arc Palm",
    "movement": "Overhead arching arc"
  },
  {
    "id": 9,
    "videoIndex": 9,
    "title": "Good Evening",
    "titleHindi": "शुभ संध्या (Good evening)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/c_R3Ykqd9B4",
    "watchUrl": "https://www.youtube.com/shorts/c_R3Ykqd9B4",
    "description": "Sign 'Good' thumbs up then lower arm to simulate sunset horizon.",
    "descriptionHindi": "थम्स-अप दिखाएं फिर हाथ को सूर्यास्त की तरह नीचे लाएं।",
    "gestureTip": "Lower arm gently across chest line.",
    "sovContext": "Evening greeting phrase.",
    "handShape": "Thumbs Up to Curved Horizon",
    "movement": "Downward sloping horizon move"
  },
  {
    "id": 10,
    "videoIndex": 10,
    "title": "Good Afternoon",
    "titleHindi": "शुभ दोपहर (Good afternoon)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/wcmaX9bHCCM",
    "watchUrl": "https://www.youtube.com/shorts/wcmaX9bHCCM",
    "description": "Sign 'Good' thumbs up then point hand directly overhead (midday sun).",
    "descriptionHindi": "थम्स-अप दिखाएं फिर दोपहर के सूरज की तरह हाथ ऊपर रखें।",
    "gestureTip": "Hold hand upright overhead.",
    "sovContext": "Midday greeting phrase.",
    "handShape": "Thumbs Up to Vertical Pointer",
    "movement": "Direct zenith position"
  },
  {
    "id": 11,
    "videoIndex": 11,
    "title": "Good Morning",
    "titleHindi": "सुप्रभात (Good morning)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/yiiDMg2kBhQ",
    "watchUrl": "https://www.youtube.com/shorts/yiiDMg2kBhQ",
    "description": "Sign 'Good' thumbs up then raise palm from base hand to mimic sunrise.",
    "descriptionHindi": "थम्स-अप दिखाएं फिर हाथ को सूर्योदय की तरह ऊपर उठाएं।",
    "gestureTip": "Bright energetic facial tone.",
    "sovContext": "Morning greeting phrase.",
    "handShape": "Thumbs Up to Sunrise Cup",
    "movement": "Upward rising motion"
  },
  {
    "id": 12,
    "videoIndex": 12,
    "title": "Thank You",
    "titleHindi": "धन्यवाद / शुक्रिया (Thank you)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/6u9MmfUMsSM",
    "watchUrl": "https://www.youtube.com/shorts/6u9MmfUMsSM",
    "description": "Touch fingertips to chin or lips and extend hand forward with open palm towards person.",
    "descriptionHindi": "उंगलियों को होंठों से छुएं और हथेली सामने की ओर बढ़ाएं।",
    "gestureTip": "Slight head nod expressing gratitude.",
    "sovContext": "Used to express appreciation.",
    "handShape": "Flat Hand to Open Forward Palm",
    "movement": "Forward extension from chin"
  },
  {
    "id": 13,
    "videoIndex": 13,
    "title": "Welcome",
    "titleHindi": "स्वागत है (Welcome)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/uIE3I3Ps3tA",
    "watchUrl": "https://www.youtube.com/shorts/uIE3I3Ps3tA",
    "description": "Sweep open palm inward toward waist level welcoming someone in.",
    "descriptionHindi": "खुली हथेली को कमर के पास अंदर की ओर लाएं।",
    "gestureTip": "Open body posture inviting someone.",
    "sovContext": "Polite response to 'Thank You'.",
    "handShape": "Open Curved Palm",
    "movement": "Inward sweeping arc"
  },
  {
    "id": 14,
    "videoIndex": 14,
    "title": "Water",
    "titleHindi": "पानी (Water)",
    "category": "Daily Needs",
    "categoryHindi": "दैनिक आवश्यकताएं",
    "embedUrl": "https://www.youtube.com/embed/uIE3I3Ps3tA",
    "watchUrl": "https://www.youtube.com/shorts/uIE3I3Ps3tA",
    "description": "Form W-shape with index, middle, and ring finger and tap index against chin twice.",
    "descriptionHindi": "W-आकार बनाकर तर्जनी उंगली से ठोड़ी को दो बार छुएं।",
    "gestureTip": "Tap chin lightly twice.",
    "sovContext": "Used when asking for drinking water.",
    "handShape": "W-Handshape (Three fingers up)",
    "movement": "Tapping against chin"
  },
  {
    "id": 15,
    "videoIndex": 15,
    "title": "Food",
    "titleHindi": "खाना / भोजन (Food)",
    "category": "Daily Needs",
    "categoryHindi": "दैनिक आवश्यकताएं",
    "embedUrl": "https://www.youtube.com/embed/tRKV-0R5HvY",
    "watchUrl": "https://www.youtube.com/shorts/tRKV-0R5HvY",
    "description": "Pinch fingers together to mouth level and move repeatedly inward.",
    "descriptionHindi": "उंगलियों के सिरों को मिलाकर मुंह की ओर लाएं।",
    "gestureTip": "Mimic taking small bites of food.",
    "sovContext": "Nouns position (e.g. 'FOOD I WANT').",
    "handShape": "Flattened O-Handshape",
    "movement": "Repeated mouthward tap"
  },
  {
    "id": 16,
    "videoIndex": 16,
    "title": "Eat",
    "titleHindi": "खाना खाना (Eat)",
    "category": "Daily Actions",
    "categoryHindi": "दैनिक क्रियाएं",
    "embedUrl": "https://www.youtube.com/embed/-X8olJ26FJg",
    "watchUrl": "https://www.youtube.com/shorts/-X8olJ26FJg",
    "description": "Form loose fist and bring fingertips to lips repeatedly.",
    "descriptionHindi": "मुट्ठी बनाकर उंगलियों को बार-बार मुंह के पास लाएं।",
    "gestureTip": "Chewing facial movement.",
    "sovContext": "Action verb (e.g. 'FOOD I EAT').",
    "handShape": "O-Handshape / Loose Fist",
    "movement": "Repeated mouth motion"
  },
  {
    "id": 17,
    "videoIndex": 17,
    "title": "Toilet",
    "titleHindi": "शौचालय (Toilet)",
    "category": "Daily Needs",
    "categoryHindi": "दैनिक आवश्यकताएं",
    "embedUrl": "https://www.youtube.com/embed/1QSOOO4DY84",
    "watchUrl": "https://www.youtube.com/shorts/1QSOOO4DY84",
    "description": "Form T-shape hand with thumb between index and middle finger and shake side-to-side.",
    "descriptionHindi": "T-आकार बनाकर हाथ को बगल में हिलाएं।",
    "gestureTip": "Shake wrist twice.",
    "sovContext": "Used for emergency directional inquiries.",
    "handShape": "T-Handshape (Thumb in V)",
    "movement": "Side-to-side wrist shake"
  },
  {
    "id": 18,
    "videoIndex": 18,
    "title": "Help Me",
    "titleHindi": "मेरी मदद करें (Help me)",
    "category": "Emergencies",
    "categoryHindi": "आपातकालीन",
    "embedUrl": "https://www.youtube.com/embed/yw9cXrPKSrI",
    "watchUrl": "https://www.youtube.com/shorts/yw9cXrPKSrI",
    "description": "Place dominant thumbs-up fist on flat palm and lift upward towards self.",
    "descriptionHindi": "हथेली पर मुट्ठी रखकर अपनी ओर उठाएं।",
    "gestureTip": "Urgent facial expression.",
    "sovContext": "Urgent request for assistance.",
    "handShape": "Thumbs Up Fist on Base Palm",
    "movement": "Inward upward directional lift"
  },
  {
    "id": 19,
    "videoIndex": 19,
    "title": "I Am Hungry",
    "titleHindi": "मुझे भूख लगी है (I am hungry)",
    "category": "Daily Needs",
    "categoryHindi": "दैनिक आवश्यकताएं",
    "embedUrl": "https://www.youtube.com/embed/OxdBMdHFFR8",
    "watchUrl": "https://www.youtube.com/shorts/OxdBMdHFFR8",
    "description": "Move C-handshape down center of chest/stomach representing empty stomach.",
    "descriptionHindi": "C-आकार के हाथ को सीने से पेट तक नीचे लाएं।",
    "gestureTip": "Slight frown indicating discomfort.",
    "sovContext": "Expressing physical sensation.",
    "handShape": "C-Handshape",
    "movement": "Downward chest stroke"
  },
  {
    "id": 20,
    "videoIndex": 20,
    "title": "Stop",
    "titleHindi": "रुको / बंद करो (Stop)",
    "category": "Commands",
    "categoryHindi": "आदेश",
    "embedUrl": "https://www.youtube.com/embed/GlwDspr6hjE",
    "watchUrl": "https://www.youtube.com/shorts/GlwDspr6hjE",
    "description": "Chop dominant flat palm downward sharply into non-dominant flat palm.",
    "descriptionHindi": "सक्रिय हथेली को गैर-सक्रिय हथेली पर तेजी से मारें।",
    "gestureTip": "Sharp firm movement stop.",
    "sovContext": "Command or negation marker.",
    "handShape": "Flat Open Palms",
    "movement": "Downward sharp chop"
  },
  {
    "id": 21,
    "videoIndex": 21,
    "title": "Call A Doctor",
    "titleHindi": "डॉक्टर को बुलाओ (Call a doctor)",
    "category": "Emergencies",
    "categoryHindi": "आपातकालीन",
    "embedUrl": "https://www.youtube.com/embed/XpFq2dXjW3A",
    "watchUrl": "https://www.youtube.com/shorts/XpFq2dXjW3A",
    "description": "Tap two fingers on wrist pulse then hold phone hand shape near ear.",
    "descriptionHindi": "कलाई पर पल्स छुएं फिर हाथ कान के पास फोन की तरह रखें।",
    "gestureTip": "Serious urgent expression.",
    "sovContext": "Medical emergency request.",
    "handShape": "Wrist Pulse Tap to Phone C-Shape",
    "movement": "Wrist tap then phone ear hold"
  },
  {
    "id": 22,
    "videoIndex": 22,
    "title": "I Need Help",
    "titleHindi": "मुझे मदद चाहिए (I need help)",
    "category": "Emergencies",
    "categoryHindi": "आपातकालीन",
    "embedUrl": "https://www.youtube.com/embed/tAXD7vPYV4E",
    "watchUrl": "https://www.youtube.com/shorts/tAXD7vPYV4E",
    "description": "Point to self then place thumbs up on palm lifting toward chest.",
    "descriptionHindi": "खुद को दिखाकर मदद का संकेत अपनी ओर उठाएं।",
    "gestureTip": "Clear eye contact.",
    "sovContext": "Emergency statement.",
    "handShape": "Index Pointer to Help Lift",
    "movement": "Point then upward lift"
  },
  {
    "id": 23,
    "videoIndex": 23,
    "title": "Sad",
    "titleHindi": "दुखी (Sad)",
    "category": "Emotions",
    "categoryHindi": "भावनाएं",
    "embedUrl": "https://www.youtube.com/embed/trw3_nVXKf4",
    "watchUrl": "https://www.youtube.com/shorts/trw3_nVXKf4",
    "description": "Bring open palms down face with drooping shoulders and sad facial expression.",
    "descriptionHindi": "खोल हथेलियों को चेहरे से नीचे लाएं और चेहरा उदास करें।",
    "gestureTip": "Droop head and mouth corners down.",
    "sovContext": "Emotion descriptive state.",
    "handShape": "Open Drooping Palms",
    "movement": "Downward face stroke"
  },
  {
    "id": 24,
    "videoIndex": 24,
    "title": "Sorry",
    "titleHindi": "माफ़ कीजिए (Sorry)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/g9egZJa36o0",
    "watchUrl": "https://www.youtube.com/shorts/g9egZJa36o0",
    "description": "Rub closed fist in circular motion over heart/chest with apologetic expression.",
    "descriptionHindi": "छाती पर मुट्ठी को गोल आकार में घुमाएं।",
    "gestureTip": "Apologetic facial expression with slight nod.",
    "sovContext": "Used to offer apology.",
    "handShape": "Closed Fist (A-Handshape)",
    "movement": "Circular chest rub"
  },
  {
    "id": 25,
    "videoIndex": 25,
    "title": "Excuse Me",
    "titleHindi": "सुनिए / क्षमा करें (Excuse me)",
    "category": "Polite Phrases",
    "categoryHindi": "विनम्रता",
    "embedUrl": "https://www.youtube.com/embed/EMZqnryIV_o",
    "watchUrl": "https://www.youtube.com/shorts/EMZqnryIV_o",
    "description": "Slide fingertips of active hand lightly across base palm.",
    "descriptionHindi": "सक्रिय उंगलियों को दूसरी हथेली पर हल्के से खिसकाएं।",
    "gestureTip": "Gentle head tilt.",
    "sovContext": "Used to attract polite attention.",
    "handShape": "Bent Fingertips on Base Palm",
    "movement": "Light forward slide"
  },
  {
    "id": 26,
    "videoIndex": 26,
    "title": "Yes",
    "titleHindi": "हाँ (Yes)",
    "category": "Responses",
    "categoryHindi": "प्रतिक्रियाएं",
    "embedUrl": "https://www.youtube.com/embed/Yy2fdzxf3mw",
    "watchUrl": "https://www.youtube.com/shorts/Yy2fdzxf3mw",
    "description": "Form S-fist and nod fist up and down like a head nodding.",
    "descriptionHindi": "मुट्ठी बनाकर उसे सिर की तरह ऊपर-नीचे हिलाएं।",
    "gestureTip": "Nod head simultaneously.",
    "sovContext": "Affirmative answer.",
    "handShape": "Closed Fist (S-Shape)",
    "movement": "Vertical fist nodding"
  },
  {
    "id": 27,
    "videoIndex": 27,
    "title": "Happy",
    "titleHindi": "खुश (Happy)",
    "category": "Emotions",
    "categoryHindi": "भावनाएं",
    "embedUrl": "https://www.youtube.com/embed/eucWQUbRv8Y",
    "watchUrl": "https://www.youtube.com/shorts/eucWQUbRv8Y",
    "description": "Pat open palms upward against chest repeatedly with big broad smile.",
    "descriptionHindi": "सीधी हथेलियों को छाती पर ऊपर की ओर थपथपाएं और मुस्कुराएं।",
    "gestureTip": "Wide open eyes and big smile mandatory.",
    "sovContext": "Emotional state description.",
    "handShape": "Flat Open Palms",
    "movement": "Upward repeated chest pat"
  },
  {
    "id": 28,
    "videoIndex": 28,
    "title": "No",
    "titleHindi": "नहीं (No)",
    "category": "Responses",
    "categoryHindi": "प्रतिक्रियाएं",
    "embedUrl": "https://www.youtube.com/embed/66pzv28KIZU",
    "watchUrl": "https://www.youtube.com/shorts/66pzv28KIZU",
    "description": "Snap index and middle finger down onto thumb while shaking head side to side.",
    "descriptionHindi": "तर्जनी और मध्यमा उंगली को अंगूठे पर बंद करें और सिर हिलाएं।",
    "gestureTip": "Shake head left to right.",
    "sovContext": "Negative response or denial.",
    "handShape": "N-Handshape snapping shut",
    "movement": "Rapid pinch shut"
  },
  {
    "id": 29,
    "videoIndex": 29,
    "title": "Father",
    "titleHindi": "पिता (Father)",
    "category": "Family",
    "categoryHindi": "परिवार",
    "embedUrl": "https://www.youtube.com/embed/_zw68ve0nQ0",
    "watchUrl": "https://www.youtube.com/shorts/_zw68ve0nQ0",
    "description": "Tap index finger across upper lip/mustache area twice.",
    "descriptionHindi": "तर्जनी उंगली से मूंछों के स्थान पर दो बार छुएं।",
    "gestureTip": "Gentle tapping near upper lip.",
    "sovContext": "Family relationship noun.",
    "handShape": "Index Finger Pointer",
    "movement": "Horizontal mustache tap"
  },
  {
    "id": 30,
    "videoIndex": 30,
    "title": "Mother",
    "titleHindi": "माता (Mother)",
    "category": "Family",
    "categoryHindi": "परिवार",
    "embedUrl": "https://www.youtube.com/embed/rPtwfn7lbg0",
    "watchUrl": "https://www.youtube.com/shorts/rPtwfn7lbg0",
    "description": "Touch thumb or index finger to side of chin/earlobe area twice (traditional ear stud quadrant).",
    "descriptionHindi": "अंगूठे या उंगली से ठोड़ी या कान के पास दो बार छुएं।",
    "gestureTip": "Soft facial expression.",
    "sovContext": "Family relationship noun.",
    "handShape": "Open Flat Hand / Thumb Tap",
    "movement": "Chin side tap"
  },
  {
    "id": 31,
    "videoIndex": 31,
    "title": "My Name Is Saanvi",
    "titleHindi": "मेरा नाम सान्वी है (My name is Saanvi)",
    "category": "Introductions",
    "categoryHindi": "परिचय",
    "embedUrl": "https://www.youtube.com/embed/rFeLX2tYags",
    "watchUrl": "https://www.youtube.com/shorts/rFeLX2tYags",
    "description": "Sign 'MY' (palm on chest) -> 'NAME' (H-fingers tap) -> fingerspell 'SAANVI'.",
    "descriptionHindi": "मेरा (छाती पर हथेली) -> नाम (उंगलियों की टैप) -> सान्वी स्पेल करें।",
    "gestureTip": "Clear distinct fingerspelling.",
    "sovContext": "Standard ISL self-introduction structure.",
    "handShape": "Flat Palm to H-Fingers",
    "movement": "Chest tap then name tap"
  },
  {
    "id": 32,
    "videoIndex": 32,
    "title": "What Is Your Name?",
    "titleHindi": "आपका नाम क्या है? (What is your name?)",
    "category": "Introductions",
    "categoryHindi": "परिचय",
    "embedUrl": "https://www.youtube.com/embed/qyFLX20D3L8",
    "watchUrl": "https://www.youtube.com/shorts/qyFLX20D3L8",
    "description": "Point 'YOUR' (palm forward) -> 'NAME' (H-fingers tap) -> 'WHAT' (shrug palms up with raised eyebrows).",
    "descriptionHindi": "आपका -> नाम -> क्या? (हथेलियां ऊपर और भौहें उठाएं)।",
    "gestureTip": "Eyebrows must be furrowed or raised for question marker.",
    "sovContext": "SOV Question placement: YOUR NAME WHAT?",
    "handShape": "Forward Palm to Upward Palms",
    "movement": "Forward push then upward shrug"
  },
  {
    "id": 33,
    "videoIndex": 33,
    "title": "I Am A Student",
    "titleHindi": "मैं एक छात्र हूँ (I am a student)",
    "category": "Introductions",
    "categoryHindi": "परिचय",
    "embedUrl": "https://www.youtube.com/embed/UiZ_cKm-Obs",
    "watchUrl": "https://www.youtube.com/shorts/UiZ_cKm-Obs",
    "description": "Point to self ('I') then sign 'STUDENT' (grabbing knowledge from book palm to forehead).",
    "descriptionHindi": "खुद की तरफ इशारा करें फिर 'छात्र' (हथेली से माथे तक ज्ञान लेने का संकेत) करें।",
    "gestureTip": "Clear confident posture.",
    "sovContext": "Self identity statement: I STUDENT I.",
    "handShape": "Index Pointer to Palm-Forehead Pinch",
    "movement": "Palm grab up to forehead"
  },
  {
    "id": 34,
    "videoIndex": 34,
    "title": "I Am From India",
    "titleHindi": "मैं भारत से हूँ (I am from India)",
    "category": "Introductions",
    "categoryHindi": "परिचय",
    "embedUrl": "https://www.youtube.com/embed/bBzAAw5iQn8",
    "watchUrl": "https://www.youtube.com/shorts/bBzAAw5iQn8",
    "description": "Point to self ('I') -> sign 'INDIA' (index touch center forehead bindi spot) -> sign 'FROM'.",
    "descriptionHindi": "खुद की ओर इशारा -> भारत (माथे के बीच उंगली) -> से।",
    "gestureTip": "Touch center of forehead between eyebrows for India.",
    "sovContext": "Origin statement: I INDIA FROM.",
    "handShape": "Index Pointer to Forehead Touch",
    "movement": "Direct touch to bindi location"
  },
  {
    "id": 35,
    "videoIndex": 35,
    "title": "I Don't Understand",
    "titleHindi": "मुझे समझ नहीं आया (I don't understand)",
    "category": "Communication",
    "categoryHindi": "संवाद",
    "embedUrl": "https://www.youtube.com/embed/3oxwv7luE-E",
    "watchUrl": "https://www.youtube.com/shorts/3oxwv7luE-E",
    "description": "Flick index finger up near temple/forehead while shaking head side to side in confusion.",
    "descriptionHindi": "माथे के पास तर्जनी उंगली झटकें और सिर हिलाएं।",
    "gestureTip": "Confused facial expression with headshake.",
    "sovContext": "Negative communication state.",
    "handShape": "Index Flick at Temple",
    "movement": "Upward finger flick with headshake"
  }
];

export default function ActionLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeItemModal, setActiveItemModal] = useState(null);

  const categories = ['All', ...new Set(ACTION_SIGNS_DATA.map(i => i.category))];

  const filteredSigns = ACTION_SIGNS_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleHindi.includes(searchTerm) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 pt-2 px-2 lg:px-4 w-full min-h-screen">
      
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="font-black text-2xl text-[#4b4b4b] dark:text-white flex items-center gap-2">
          <Film className="w-6 h-6 text-[#1cb0f6]" /> Action Signs & Gestures Library
        </h2>
        <p className="text-xs text-[#afafaf] dark:text-[#52656d] font-bold">
          Explore {ACTION_SIGNS_DATA.length} authentic Indian Sign Language (ISL) action gestures with video playback and grammar details.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#afafaf]" />
        <input
          type="text"
          placeholder="Search action signs in English or Hindi (e.g., Hello, Eat, Water, Student)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[20px] py-3.5 pl-12 pr-4 text-sm font-bold text-[#4b4b4b] dark:text-white placeholder-[#afafaf] focus:outline-none focus:border-[#1cb0f6] transition-colors shadow-xs"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all uppercase tracking-wide border-2 ${
              activeCategory === cat
                ? 'bg-[#1cb0f6] text-white border-[#1899d6] shadow-xs scale-105'
                : 'bg-white dark:bg-[#18252b] text-[#4b4b4b] dark:text-white border-[#e5e5e5] dark:border-[#37464f] hover:border-[#1cb0f6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSigns.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[24px] p-5 shadow-sm hover:border-[#1cb0f6] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-[#1cb0f6] bg-[#1cb0f6]/15 px-2.5 py-0.5 rounded-full border border-[#1cb0f6]/30 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono font-bold text-[#afafaf]">
                  #{item.id} of {ACTION_SIGNS_DATA.length}
                </span>
              </div>

              <h3 className="font-black text-xl text-[#4b4b4b] dark:text-white group-hover:text-[#1cb0f6] transition-colors mb-1">
                {item.title}
              </h3>
              <p className="text-xs font-black text-[#ffc800] mb-3">{item.titleHindi}</p>
              
              <p className="text-xs text-[#777] dark:text-[#a0a0a0] font-medium line-clamp-2 mb-4">
                {item.description}
              </p>
            </div>

            {/* Consolidated Details Button */}
            <button
              onClick={() => setActiveItemModal(item)}
              className="w-full py-3 rounded-2xl bg-[#1cb0f6] hover:bg-[#1899d6] active:scale-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all border-b-4 border-[#1479ab]"
            >
              <Video className="w-4 h-4 fill-white shrink-0" />
              <span>Details & Video</span>
            </button>
          </div>
        ))}
      </div>

      {/* Detailed Modal Window */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[32px] max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto scrollbar-none">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b-2 border-[#e5e5e5] dark:border-[#37464f]">
              <div>
                <span className="text-[10px] font-black text-[#1cb0f6] uppercase tracking-wider">
                  ACTION SIGN #{activeItemModal.id} OF {ACTION_SIGNS_DATA.length} • {activeItemModal.category}
                </span>
                <h2 className="font-black text-2xl text-[#4b4b4b] dark:text-white mt-0.5 flex items-center gap-2">
                  {activeItemModal.title}
                </h2>
                <p className="text-xs font-black text-[#ffc800]">{activeItemModal.titleHindi}</p>
              </div>

              <button
                onClick={() => setActiveItemModal(null)}
                className="w-9 h-9 rounded-full bg-[#f7f7f7] dark:bg-[#131f24] text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white border-2 border-[#e5e5e5] dark:border-[#37464f] flex items-center justify-center transition-all shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Responsive YouTube Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-3 border-2 border-[#37464f] shadow-inner">
              <iframe
                src={activeItemModal.embedUrl}
                title={`ISL Video Sign: ${activeItemModal.title}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Direct YouTube Video Watch Link Button */}
            <a
              href={activeItemModal.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 mb-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>▶ Watch "${activeItemModal.title}" Video on YouTube</span>
              <ExternalLink className="w-4 h-4 ml-auto opacity-80" />
            </a>

            {/* Comprehensive Details Section */}
            <div className="space-y-3 mb-5">
              
              {/* Handshape & Movement Badge Box */}
              <div className="bg-gradient-to-br from-[#1cb0f6]/15 to-[#58cc02]/15 border-2 border-[#1cb0f6]/40 p-4 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1cb0f6] text-white rounded-xl flex items-center justify-center shrink-0">
                    <Hand className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#4b4b4b] dark:text-white">
                      {activeItemModal.handShape}
                    </h4>
                    <p className="text-xs text-[#1cb0f6] font-bold flex items-center gap-1">
                      <Layers className="w-3 h-3" /> Movement: {activeItemModal.movement}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#f7f7f7] dark:bg-[#131f24] p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#37464f]">
                <h4 className="text-xs font-black text-[#4b4b4b] dark:text-white uppercase tracking-wider mb-1">
                  📝 Description / विवरण:
                </h4>
                <p className="text-xs font-bold text-[#4b4b4b] dark:text-white leading-relaxed mb-1">
                  {activeItemModal.description}
                </p>
                <p className="text-xs font-bold text-[#ffc800]">
                  {activeItemModal.descriptionHindi}
                </p>
              </div>

              {/* Gesture Tip */}
              <div className="bg-[#58cc02]/10 border-2 border-[#58cc02]/40 p-4 rounded-2xl">
                <h4 className="text-xs font-black text-[#58cc02] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4" /> Gesture Execution Tip:
                </h4>
                <p className="text-xs font-bold text-[#4b4b4b] dark:text-white">
                  {activeItemModal.gestureTip}
                </p>
              </div>

              {/* SOV Context */}
              <div className="bg-[#ffc800]/10 border-2 border-[#ffc800]/40 p-4 rounded-2xl">
                <h4 className="text-xs font-black text-[#ffc800] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4" /> ISL Grammar & SOV Context:
                </h4>
                <p className="text-xs font-bold text-[#4b4b4b] dark:text-white">
                  {activeItemModal.sovContext}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t-2 border-[#e5e5e5] dark:border-[#37464f] flex justify-end">
              <button
                onClick={() => setActiveItemModal(null)}
                className="px-6 py-2.5 rounded-xl bg-[#e5e5e5] dark:bg-[#37464f] hover:opacity-80 text-[#4b4b4b] dark:text-white font-black text-xs uppercase"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
