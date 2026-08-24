import React, { useState } from 'react';
import { Search, Play, Sparkles, CheckCircle2, ChevronRight, X, ExternalLink, Filter, Film, Hand, Layers, Video } from 'lucide-react';

export const ACTION_SIGNS_DATA = [
  {
    id: 0,
    videoIndex: 0,
    title: "Hello / Namaste",
    titleHindi: "नमस्ते / हैलो (Hello)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed/LiPWrTmc3TA",
    watchUrl: "https://www.youtube.com/shorts/LiPWrTmc3TA",
    description: "Raise dominant hand to chest or forehead level with flat open palm, or join both palms in Namaste gesture.",
    descriptionHindi: "सीधी हथेली से हाथ हिलाएं या नम्रता से दोनों हाथ जोड़कर नमस्ते का संकेत करें।",
    gestureTip: "Maintain friendly eye contact and a warm smiling expression while making the greeting sign.",
    sovContext: "Used at the very beginning of ISL dialogue to greet respectfully.",
    handShape: "Flat Open Palm / Joined Namaste",
    movement: "Gentle side-to-side wave or chest press"
  },
  {
    id: 1,
    videoIndex: 1,
    title: "Eat",
    titleHindi: "खाना (Eat)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=0",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=1",
    description: "Form a loose fist with active hand and move fingertips toward mouth repeatedly.",
    descriptionHindi: "मुख्य हाथ से ढीली मुट्ठी बनाएं और उंगलियों के सिरों को बार-बार मुंह की ओर लाएं।",
    gestureTip: "Bring fingertips to lips 2-3 times while making a slight chewing facial expression.",
    sovContext: "Placed at the very end of ISL sentences (e.g., 'RICE I EAT').",
    handShape: "O-Shape / Flat O Handshape",
    movement: "Repetitive towards mouth"
  },
  {
    id: 2,
    videoIndex: 2,
    title: "Drink",
    titleHindi: "पीना (Drink)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=1",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=2",
    description: "Curve active hand into a C-shape glass and tilt toward mouth.",
    descriptionHindi: "सक्रिय हाथ को C-आकार के ग्लास में मोड़ें और मुंह की ओर झुकाएं।",
    gestureTip: "Tilt head back slightly as if drinking from a glass.",
    sovContext: "Used in terminal verb position (e.g., 'WATER I DRINK').",
    handShape: "C-Shape Glass Handshape",
    movement: "Tilting upward toward lips"
  },
  {
    id: 3,
    videoIndex: 3,
    title: "Sleep",
    titleHindi: "सोना (Sleep)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=2",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=3",
    description: "Place flat palms together under cheek and tilt head sideways.",
    descriptionHindi: "गाल के नीचे दोनों सीधी हथेलियों को एक साथ रखें और सिर को बगल में झुकाएं।",
    gestureTip: "Close eyes gently to reinforce restful sleeping state.",
    sovContext: "Comes at sentence end (e.g., 'NIGHT I SLEEP').",
    handShape: "Flat Open Palms (Prayer style under cheek)",
    movement: "Head tilt sideways"
  },
  {
    id: 4,
    videoIndex: 4,
    title: "Read",
    titleHindi: "पढ़ना (Read)",
    category: "Work & Study",
    categoryHindi: "कार्य एवं अध्ययन",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=3",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=4",
    description: "Move extended index and middle fingers down flat non-dominant palm.",
    descriptionHindi: "गैर-सक्रिय हथेली पर सक्रिय तर्जनी और मध्यमा उंगली को नीचे की ओर घुमाएं।",
    gestureTip: "Mimic eyes scanning lines of text across an open book page.",
    sovContext: "Terminal verb placement (e.g., 'BOOK I READ').",
    handShape: "V-Shape / Scanning Fingers",
    movement: "Scanning motion top-to-bottom"
  },
  {
    id: 5,
    videoIndex: 5,
    title: "Write",
    titleHindi: "लिखना (Write)",
    category: "Work & Study",
    categoryHindi: "कार्य एवं अध्ययन",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=4",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=5",
    description: "Pinch thumb and index finger together and scribble across flat base palm.",
    descriptionHindi: "अंगूठे और तर्जनी को मिलाएं और सीधी हथेली पर लिखने का नाटक करें।",
    gestureTip: "Keep base hand steady while active hand writes smoothly across.",
    sovContext: "Terminal verb placement (e.g., 'LETTER I WRITE').",
    handShape: "Pinch Handshape (Pen Grip)",
    movement: "Horizontal scribbling across palm"
  },
  {
    id: 6,
    videoIndex: 6,
    title: "Run",
    titleHindi: "दौड़ना (Run)",
    category: "Motion & Movements",
    categoryHindi: "गति और चाल",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=5",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=6",
    description: "Hook index fingers of both hands and pump arms in rapid jogging motion.",
    descriptionHindi: "दोनों हाथों की तर्जनी उंगलियों को मोड़ें और तेजी से दौड़ने की मुद्रा बनाएं।",
    gestureTip: "Leaning forward slightly reinforces speed.",
    sovContext: "Action verb marker (e.g., 'FAST HE RUN').",
    handShape: "Hooked Index Fingers",
    movement: "Forward arm pumping"
  },
  {
    id: 7,
    videoIndex: 7,
    title: "Walk",
    titleHindi: "चलना (Walk)",
    category: "Motion & Movements",
    categoryHindi: "गति और चाल",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=6",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=7",
    description: "Point index and middle fingers downward and alternate them forward like legs.",
    descriptionHindi: "तर्जनी और मध्यमा उंगलियों को नीचे करें और पैरों की तरह आगे-पीछे चलाएं।",
    gestureTip: "Pace the walking finger rhythm according to speed.",
    sovContext: "Terminal movement verb (e.g., 'HOME I WALK').",
    handShape: "Inverted V-Shape (Legs)",
    movement: "Alternating forward steps"
  },
  {
    id: 8,
    videoIndex: 8,
    title: "Stand",
    titleHindi: "खड़े होना (Stand)",
    category: "Motion & Movements",
    categoryHindi: "गति और चाल",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=7",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=8",
    description: "Place inverted V-shape fingers upright on flat base palm.",
    descriptionHindi: "उलटे V-आकार की उंगलियों को सीधी हथेली पर सीधा खड़ा रखें।",
    gestureTip: "Keep fingers firm and upright to show stability.",
    sovContext: "Position state verb (e.g., 'HERE YOU STAND').",
    handShape: "Inverted V-Shape on Flat Palm",
    movement: "Static upright posture"
  },
  {
    id: 9,
    videoIndex: 9,
    title: "Sit",
    titleHindi: "बैठना (Sit)",
    category: "Motion & Movements",
    categoryHindi: "गति और चाल",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=8",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=9",
    description: "Hook bent index and middle fingers over non-dominant index and middle fingers.",
    descriptionHindi: "मुड़ी हुई उंगलियों को दूसरी हथेली की उंगलियों के ऊपर बैठाएं।",
    gestureTip: "Move hands down smoothly into the seated position.",
    sovContext: "Position state verb (e.g., 'CHAIR I SIT').",
    handShape: "Bent V-Shape seated over base fingers",
    movement: "Downward landing motion"
  },
  {
    id: 10,
    videoIndex: 10,
    title: "Help",
    titleHindi: "मदद (Help)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=9",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=10",
    description: "Place dominant thumbs-up fist on flat non-dominant palm and lift upward together.",
    descriptionHindi: "सीधी हथेली पर अंगूठा ऊपर करके मुट्ठी रखें और दोनों को ऊपर उठाएं।",
    gestureTip: "Directional sign: move toward person receiving help.",
    sovContext: "Politeness & assistance verb (e.g., 'ME YOU HELP').",
    handShape: "Thumbs-up fist on flat palm",
    movement: "Upward directional lift"
  },
  {
    id: 11,
    videoIndex: 11,
    title: "Love",
    titleHindi: "प्यार (Love)",
    category: "Emotions & Expressions",
    categoryHindi: "भावनाएं एवं अभिव्यक्ति",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=10",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=11",
    description: "Cross both arms over chest with fists closed and press inward warmly.",
    descriptionHindi: "दोनों हाथों को छाती पर क्रॉस करें और गर्मजोशी से अंदर दबाएं।",
    gestureTip: "A warm smiling facial expression reinforces emotional depth.",
    sovContext: "Affection verb marker (e.g., 'FAMILY I LOVE').",
    handShape: "Crossed Arms / Fists at Chest",
    movement: "Inward hug gesture"
  },
  {
    id: 12,
    videoIndex: 12,
    title: "Stop",
    titleHindi: "रुकना (Stop)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=11",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=12",
    description: "Chop edge of open flat active palm firmly into open base palm.",
    descriptionHindi: "सक्रिय हथेली के किनारे को दूसरी हथेली पर मजबूती से मारें।",
    gestureTip: "Use a firm facial expression with clear head halt.",
    sovContext: "Terminal directive marker (e.g., 'BUS STOP').",
    handShape: "Open Flat Palm Chop",
    movement: "Downward firm chop"
  },
  {
    id: 13,
    videoIndex: 13,
    title: "Play",
    titleHindi: "खेलना (Play)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=12",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=13",
    description: "Extend thumb and pinky (Y-shape) of both hands and twist wrists rapidly near chest.",
    descriptionHindi: "दोनों हाथों के अंगूठे और कनिष्ठा को खोलें (Y-आकार) और कलाइयों को घुमाएं।",
    gestureTip: "Maintain a cheerful, energetic facial expression.",
    sovContext: "Activity verb (e.g., 'CRICKET WE PLAY').",
    handShape: "Y-Shape (Thumb & Pinky)",
    movement: "Rapid wrist shaking"
  },
  {
    id: 14,
    videoIndex: 14,
    title: "Wash",
    titleHindi: "धोना (Wash)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=13",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=14",
    description: "Rub fists together in circular scrubbing motion in front of chest.",
    descriptionHindi: "छाती के सामने मुट्ठियों को गोलाकार गति में आपस में रगड़ें।",
    gestureTip: "Mimic washing clothes or scrubbing hands under water.",
    sovContext: "Hygiene verb (e.g., 'HANDS I WASH').",
    handShape: "Closed Fists",
    movement: "Circular scrubbing motion"
  },
  {
    id: 15,
    videoIndex: 15,
    title: "Cook",
    titleHindi: "खाना पकाना (Cook)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=14",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=15",
    description: "Flip flat active hand over and back onto non-dominant base palm like cooking roti.",
    descriptionHindi: "सक्रिय हथेली को दूसरी हथेली पर रोटी पकाने की तरह उलटें-पलटें।",
    gestureTip: "Rhythmic flipping motions represent pan cooking.",
    sovContext: "Kitchen activity verb (e.g., 'MOTHER FOOD COOK').",
    handShape: "Flat Open Palm",
    movement: "Rhythmic palm flipping"
  },
  {
    id: 16,
    videoIndex: 16,
    title: "Drive",
    titleHindi: "गाड़ी चलाना (Drive)",
    category: "Motion & Movements",
    categoryHindi: "गति और चाल",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=15",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=16",
    description: "Hold imaginary steering wheel with both fists and turn gently side-to-side.",
    descriptionHindi: "दोनों मुट्ठियों से काल्पनिक स्टीयरिंग व्हील पकड़ें और घुमाएं।",
    gestureTip: "Keep eyes focused forward as if steering on a road.",
    sovContext: "Transit action verb (e.g., 'CAR I DRIVE').",
    handShape: "Dual Fists Steering",
    movement: "Rotational turning"
  },
  {
    id: 17,
    videoIndex: 17,
    title: "Listen",
    titleHindi: "सुनना (Listen)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=16",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=17",
    description: "Cup active hand behind ear and tilt head slightly towards sound source.",
    descriptionHindi: "सक्रिय हाथ को कान के पीछे कप की तरह रखें और सिर को थोड़ा झुकाएं।",
    gestureTip: "Attentive eye focus indicates listening intention.",
    sovContext: "Perception verb (e.g., 'TEACHER I LISTEN').",
    handShape: "Cupped Palm at Ear",
    movement: "Head tilt & cupping"
  },
  {
    id: 18,
    videoIndex: 18,
    title: "Look",
    titleHindi: "देखना (Look)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=17",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=18",
    description: "Point V-shape index and middle fingers from eyes outward toward target.",
    descriptionHindi: "V-आकार की उंगलियों को अपनी आंखों से बाहर लक्ष्य की ओर इशारा करें।",
    gestureTip: "Directional verb: point fingers exactly toward what is being viewed.",
    sovContext: "Visual perception verb (e.g., 'THERE YOU LOOK').",
    handShape: "V-Shape at Eyes",
    movement: "Outward directional pointing"
  },
  {
    id: 19,
    videoIndex: 19,
    title: "Speak",
    titleHindi: "बोलना (Speak)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=18",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=19",
    description: "Move index finger forward repeatedly from lips in small rolling arcs.",
    descriptionHindi: "तर्जनी उंगली को होठों के पास से आगे की ओर बार-बार घुमाएं।",
    gestureTip: "Mouth words softly to demonstrate oral speech.",
    sovContext: "Communication verb (e.g., 'ENGLISH HE SPEAK').",
    handShape: "Index Finger at Lips",
    movement: "Forward rolling arcs"
  },
  {
    id: 20,
    videoIndex: 20,
    title: "Open",
    titleHindi: "खोलना (Open)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=19",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=20",
    description: "Start with palms together and swing them apart outwards like door hinges.",
    descriptionHindi: "जुड़ी हथेलियों से शुरू करें और उन्हें दरवाजे की तरह बाहर की ओर खोलें।",
    gestureTip: "Smooth outwards swing represents unlatching or opening.",
    sovContext: "Object action verb (e.g., 'DOOR YOU OPEN').",
    handShape: "Joined Flat Palms",
    movement: "Outward swinging motion"
  },
  {
    id: 21,
    videoIndex: 21,
    title: "Close",
    titleHindi: "बंद करना (Close)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=20",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=21",
    description: "Start with open palms apart and bring them together flat in front of chest.",
    descriptionHindi: "अलग-अलग हथेलियों से शुरू करें और उन्हें छाती के सामने एक साथ लाएं।",
    gestureTip: "Firm contact when palms touch shows complete closure.",
    sovContext: "Object action verb (e.g., 'WINDOW YOU CLOSE').",
    handShape: "Separated Open Palms",
    movement: "Inward clapping close"
  },
  {
    id: 22,
    videoIndex: 22,
    title: "Buy",
    titleHindi: "खरीदना (Buy)",
    category: "Work & Study",
    categoryHindi: "कार्य एवं अध्ययन",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=21",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=22",
    description: "Place active pinched hand onto non-dominant base palm and move outward as if handing money.",
    descriptionHindi: "अंगूठे-उंगली से चुटकी बनाकर हथेली पर रखें और पैसे देने की तरह आगे बढ़ाएं।",
    gestureTip: "Mimic transferring money notes for a transaction.",
    sovContext: "Commerce verb (e.g., 'BOOK I BUY').",
    handShape: "Pinch Hand on Base Palm",
    movement: "Forward money distribution"
  },
  {
    id: 23,
    videoIndex: 23,
    title: "Sell",
    titleHindi: "बेचना (Sell)",
    category: "Work & Study",
    categoryHindi: "कार्य एवं अध्ययन",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=22",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=23",
    description: "Hold both hands in loose fists near shoulders and flick fingers forward repeatedly.",
    descriptionHindi: "कंधों के पास ढीली मुट्ठियां रखें और उंगलियों को बार-बार आगे झटका दें।",
    gestureTip: "Repetitive forward flicks represent offering items to customers.",
    sovContext: "Commerce verb (e.g., 'FRUITS HE SELL').",
    handShape: "Loose Fists at Shoulders",
    movement: "Forward finger flicking"
  },
  {
    id: 24,
    videoIndex: 24,
    title: "Give",
    titleHindi: "देना (Give)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=23",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=24",
    description: "Hold flat palms facing upward near chest and extend forward toward receiver.",
    descriptionHindi: "छाती के पास ऊपर की ओर खुली हथेलियां रखें और लेने वाले की तरफ बढ़ाएं।",
    gestureTip: "Directional verb: move palms directly toward recipient.",
    sovContext: "Transfer verb (e.g., 'PEN I GIVE YOU').",
    handShape: "Upward Open Palms",
    movement: "Forward directional extension"
  },
  {
    id: 25,
    videoIndex: 25,
    title: "Take",
    titleHindi: "लेना (Take)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=24",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=25",
    description: "Extend open hands outward, grab into fists, and pull back towards chest.",
    descriptionHindi: "खुले हाथों को आगे बढ़ाएं, मुट्ठी में पकड़ें और अपनी छाती की ओर वापस खींचें।",
    gestureTip: "Pulling motion toward yourself signifies receiving or acquiring.",
    sovContext: "Transfer verb (e.g., 'MONEY I TAKE').",
    handShape: "Open Hands into Grab Fists",
    movement: "Inward pulling motion"
  },
  {
    id: 26,
    videoIndex: 26,
    title: "Think",
    titleHindi: "सोचना (Think)",
    category: "Emotions & Expressions",
    categoryHindi: "भावनाएं एवं अभिव्यक्ति",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=25",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=26",
    description: "Tap active index finger on side of forehead repeatedly.",
    descriptionHindi: "माथे की तरफ अपनी सक्रिय तर्जनी उंगली से बार-बार स्पर्श करें।",
    gestureTip: "A pensive facial expression with eyes looking slightly up enhances intent.",
    sovContext: "Cognitive verb (e.g., 'IDEA I THINK').",
    handShape: "Index Finger at Temple",
    movement: "Repetitive temple tapping"
  },
  {
    id: 27,
    videoIndex: 27,
    title: "Understand",
    titleHindi: "समझना (Understand)",
    category: "Emotions & Expressions",
    categoryHindi: "भावनाएं एवं अभिव्यक्ति",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=26",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=27",
    description: "Flick index finger upward near temple like a lightbulb turning on.",
    descriptionHindi: "कनपटी के पास तर्जनी उंगली को ऊपर की ओर झटकें जैसे दिमाग की बत्ती जली हो।",
    gestureTip: "Accompany with an affirmative head nod.",
    sovContext: "Comprehension state (e.g., 'LESSON I UNDERSTAND').",
    handShape: "Bent Index at Temple",
    movement: "Upward finger flick"
  },
  {
    id: 28,
    videoIndex: 28,
    title: "Smile",
    titleHindi: "मुस्कुराना (Smile)",
    category: "Emotions & Expressions",
    categoryHindi: "भावनाएं एवं अभिव्यक्ति",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=27",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=28",
    description: "Trace index fingers from corners of mouth outward and upward along cheeks.",
    descriptionHindi: "मुंह के कोनों से गालों के ऊपर तक दोनों तर्जनी उंगलियों से रेखा खींचें।",
    gestureTip: "Show a natural warm smile on your face.",
    sovContext: "Expression state (e.g., 'HAPPY FACE SMILE').",
    handShape: "Dual Index Fingers",
    movement: "Curved upward mouth tracing"
  },
  {
    id: 29,
    videoIndex: 29,
    title: "Laugh",
    titleHindi: "हंसना (Laugh)",
    category: "Emotions & Expressions",
    categoryHindi: "भावनाएं एवं अभिव्यक्ति",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=28",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=29",
    description: "Pat chest lightly with open curved fingers while showing joyful laughing expression.",
    descriptionHindi: "छाती को मुड़ी उंगलियों से थपथपाएं और चेहरे पर खुशी की हंसी लाएं।",
    gestureTip: "Light chest vibration mimics laughter.",
    sovContext: "Emotion verb (e.g., 'JOKE HE LAUGH').",
    handShape: "Curved Open Fingers",
    movement: "Repetitive chest patting"
  },
  {
    id: 30,
    videoIndex: 30,
    title: "Cry",
    titleHindi: "रोना (Cry)",
    category: "Emotions & Expressions",
    categoryHindi: "भावनाएं एवं अभिव्यक्ति",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=29",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=30",
    description: "Alternate index fingers moving down cheeks from eyes like falling teardrops.",
    descriptionHindi: "आंखों से गालों के नीचे आंसू गिरने की तरह बारी-बारी उंगलियां चलाएं।",
    gestureTip: "A sad, downturned facial expression is essential.",
    sovContext: "Emotion verb (e.g., 'BABY CRY').",
    handShape: "Alternating Index Fingers",
    movement: "Downward teardrop tracing"
  },
  {
    id: 31,
    videoIndex: 31,
    title: "Call",
    titleHindi: "बुलाना (Call)",
    category: "Communication",
    categoryHindi: "संवाद और बातचीत",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=30",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=31",
    description: "Form phone receiver with thumb and pinky near ear, or wave flat hand inward to summon.",
    descriptionHindi: "अंगूठे और कनिष्ठा से फोन बनाएं या हाथ से अपनी तरफ आने का इशारा करें।",
    gestureTip: "Use clear directional motion toward person being called.",
    sovContext: "Communication verb (e.g., 'DOCTOR I CALL').",
    handShape: "Y-Shape Phone at Ear",
    movement: "Summoning inward wave"
  },
  {
    id: 32,
    videoIndex: 32,
    title: "Dance",
    titleHindi: "नाचना (Dance)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=31",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=32",
    description: "Swing inverted V-shape fingers of active hand back and forth over flat base palm.",
    descriptionHindi: "उलटे V-आकार की उंगलियों को दूसरी हथेली पर नृत्य की तरह आगे-पीछे घुमाएं।",
    gestureTip: "Rhythmic swaying motion captures dancing legs.",
    sovContext: "Entertainment verb (e.g., 'MUSIC SHE DANCE').",
    handShape: "Inverted V-Shape (Dancing Legs)",
    movement: "Rhythmic swaying across palm"
  },
  {
    id: 33,
    videoIndex: 33,
    title: "Sing",
    titleHindi: "गाना (Sing)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=32",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=33",
    description: "Wave curved open palm rhythmically back and forth in front of mouth.",
    descriptionHindi: "मुंह के सामने हथेली को लयात्मक रूप से आगे-पीछे लहराएं।",
    gestureTip: "Mouth melody shapes gracefully while waving hand.",
    sovContext: "Performance verb (e.g., 'SONG SHE SING').",
    handShape: "Curved Open Palm",
    movement: "Rhythmic vocal waving"
  },
  {
    id: 34,
    videoIndex: 34,
    title: "Work",
    titleHindi: "काम करना (Work)",
    category: "Work & Study",
    categoryHindi: "कार्य एवं अध्ययन",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=33",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=34",
    description: "Tap wrist of dominant fist onto wrist of non-dominant fist repeatedly.",
    descriptionHindi: "एक मुट्ठी की कलाई को दूसरी मुट्ठी की कलाई पर बार-बार थपथपाएं।",
    gestureTip: "Firm, steady tapping shows diligence.",
    sovContext: "Occupation verb (e.g., 'OFFICE I WORK').",
    handShape: "Dual Closed Fists",
    movement: "Wrist-on-wrist tapping"
  },
  {
    id: 35,
    videoIndex: 35,
    title: "Study",
    titleHindi: "अध्ययन (Study)",
    category: "Work & Study",
    categoryHindi: "कार्य एवं अध्ययन",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=34",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=35",
    description: "Flutter fingertips of active hand toward flat non-dominant palm repeatedly.",
    descriptionHindi: "सीधी हथेली की तरफ सक्रिय हाथ की उंगलियों को बार-बार फड़फड़ाएं।",
    gestureTip: "Focused eyes scanning page demonstrates intense study.",
    sovContext: "Academic verb (e.g., 'EXAM FOR I STUDY').",
    handShape: "Fluttering Fingertips",
    movement: "Rapid scanning toward palm"
  },
  {
    id: 36,
    videoIndex: 36,
    title: "Pray",
    titleHindi: "प्रार्थना (Pray)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=35",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=36",
    description: "Press both flat palms together upright at chest height in traditional Namaste pose.",
    descriptionHindi: "छाती की ऊंचाई पर दोनों सीधी हथेलियों को नम्रता से जोड़ें।",
    gestureTip: "Bow head slightly with serene expression.",
    sovContext: "Devotional action (e.g., 'TEMPLE GOD I PRAY').",
    handShape: "Joined Flat Palms (Namaste)",
    movement: "Gentle inward press"
  },
  {
    id: 37,
    videoIndex: 37,
    title: "Clean",
    titleHindi: "सफ़ाई (Clean)",
    category: "Daily Actions",
    categoryHindi: "दैनिक क्रियाएं",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=36",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=37",
    description: "Sweep active flat palm across non-dominant base palm outward from wrist to fingertips.",
    descriptionHindi: "सक्रिय हथेली को दूसरी हथेली पर कलाई से उंगलियों तक बाहर की तरफ झाड़ें।",
    gestureTip: "Firm sweeping movement signifies wiping dust away.",
    sovContext: "Chore verb (e.g., 'ROOM I CLEAN').",
    handShape: "Flat Open Palm",
    movement: "Outward sweeping motion"
  },
  {
    id: 38,
    videoIndex: 38,
    title: "Jump",
    titleHindi: "कूदना (Jump)",
    category: "Motion & Movements",
    categoryHindi: "गति और चाल",
    embedUrl: "https://www.youtube.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=37",
    watchUrl: "https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=38",
    description: "Place inverted V-shape fingers on palm and spring them upward into the air.",
    descriptionHindi: "उलटे V-आकार की उंगलियों को हथेली पर रखें और हवा में ऊपर की तरफ उछालें।",
    gestureTip: "Bouncing spring motion mimics jumping high.",
    sovContext: "Action movement verb (e.g., 'HIGH I JUMP').",
    handShape: "Inverted V-Shape Spring",
    movement: "Upward air spring"
  }
];

export default function ActionLibrary({ userProgress }) {
  const isHindi = userProgress?.appLanguage === 'hindi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeItemModal, setActiveItemModal] = useState(null);

  const categories = [
    'ALL',
    'Daily Actions',
    'Communication',
    'Motion & Movements',
    'Emotions & Expressions',
    'Work & Study'
  ];

  const filteredSigns = ACTION_SIGNS_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-28 pt-2 max-w-4xl mx-auto w-full px-3 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1cb0f6] to-[#0086c9] text-white rounded-[28px] p-6 sm:p-8 shadow-xl border-b-6 border-[#0074b0] mb-8 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] opacity-15 pointer-events-none">
          <Film className="w-48 h-48 text-white stroke-[1.5]" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#ffc800]" />
            {isHindi ? 'विशेष एक्शन संग्रह • 38 पाठ' : 'SPECIAL ACTION COLLECTION • 38 VIDEOS'}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-2">
            {isHindi ? 'ISL एकल शब्द एक्शन लाइब्रेरी' : 'ISL Action Signs Library'}
          </h1>
          <p className="text-sm sm:text-base font-bold text-white/90 max-w-2xl leading-relaxed mb-4">
            {isHindi 
              ? '38 मुख्य क्रियाओं, हाव-भाव और 3D सांकेतिक प्रदर्शनों का विशेष संग्रह। प्रत्येक शब्द की वीडियो, सांकेतिक विधि और व्याकरण समझें।'
              : 'Explore the complete 38 single-word ISL action signs collection. High-definition visual demonstrations, step-by-step hand gestures, and syntax guides.'}
          </p>

          <a 
            href="https://youtube.com/playlist?list=PLHhpObfAQ1ss" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#0086c9] hover:bg-white/95 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            {isHindi ? 'यूट्यूब प्लेलिस्ट (38 वीडियो)' : 'Open YouTube Playlist (38 Videos) ↗'}
          </a>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4 mb-8">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#afafaf]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? 'किसी भी एक्शन शब्द को खोजें (जैसे: Eat, Sleep, Run...)' : 'Search any action sign (e.g. Eat, Sleep, Run, Help...)'}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] focus:border-[#1cb0f6] text-sm font-bold text-[#4b4b4b] dark:text-white placeholder-[#afafaf] outline-none shadow-xs transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1cb0f6] text-white shadow-md border-b-4 border-[#0086c9]'
                    : 'bg-white dark:bg-[#18252b] text-[#777] dark:text-[#a0a0a0] border-2 border-[#e5e5e5] dark:border-[#37464f] hover:bg-[#f0f0f0] dark:hover:bg-[#202f36]'
                }`}
              >
                {cat === 'ALL' ? (isHindi ? 'सभी (38)' : 'ALL (38)') : cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of 38 Action Signs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSigns.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] hover:border-[#1cb0f6] dark:hover:border-[#1cb0f6] rounded-[24px] p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#1cb0f6]/10 text-[#1cb0f6] px-3 py-1 rounded-full border border-[#1cb0f6]/30">
                  {isHindi ? item.categoryHindi : item.category}
                </span>
                <span className="text-xs font-black text-[#afafaf]">
                  #{item.videoIndex} / 38
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-[#4b4b4b] dark:text-white group-hover:text-[#1cb0f6] transition-colors mb-1">
                {isHindi ? item.titleHindi : item.title}
              </h3>

              {/* Handshape Badge */}
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#ff9600] bg-[#ff9600]/10 px-2.5 py-0.5 rounded-md mb-3">
                <Hand className="w-3 h-3" />
                <span>{item.handShape}</span>
              </div>

              {/* Description */}
              <p className="text-xs font-bold text-[#777] dark:text-[#a0a0a0] leading-relaxed mb-4">
                {isHindi ? item.descriptionHindi : item.description}
              </p>

              {/* Gesture Tip */}
              <div className="bg-[#f7f7f7] dark:bg-[#131f24] p-3 rounded-xl border border-[#e5e5e5]/60 dark:border-[#37464f]/60 mb-4">
                <span className="text-[10px] font-black text-[#1cb0f6] uppercase tracking-wider block mb-1">
                  ✋ {isHindi ? 'सांकेतिक विधि' : 'Gesture Technique'}
                </span>
                <p className="text-xs font-medium text-[#4b4b4b] dark:text-[#d0d0d0] leading-snug">
                  {item.gestureTip}
                </p>
              </div>

              {/* SOV Context */}
              <div className="text-[11px] font-bold text-[#58cc02] dark:text-[#61e002] flex items-start gap-1.5 mb-4">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{item.sovContext}</span>
              </div>
            </div>

            {/* Single Clean DETAILS Action Button */}
            <div className="pt-3 border-t border-[#e5e5e5] dark:border-[#37464f]">
              <button
                onClick={() => setActiveItemModal(item)}
                className="w-full py-3 px-4 rounded-2xl bg-[#1cb0f6] text-white hover:bg-[#0086c9] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer border-b-4 border-[#0086c9]"
              >
                <Layers className="w-4 h-4" />
                <span>{isHindi ? 'विवरण (DETAILS)' : 'DETAILS'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {filteredSigns.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-[#18252b] rounded-[24px] border-2 border-dashed border-[#e5e5e5] dark:border-[#37464f] p-8">
          <p className="text-base font-black text-[#777] dark:text-[#a0a0a0]">
            {isHindi ? 'कोई एक्शन शब्द नहीं मिला' : 'No action signs matched your query'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#1cb0f6] text-white font-black text-xs uppercase tracking-wider"
          >
            {isHindi ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* Embedded Video Player & Full Details Modal Popup */}
      {activeItemModal && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative my-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e5e5e5] dark:border-[#37464f]">
              <div>
                <span className="text-[10px] font-black text-[#1cb0f6] uppercase tracking-wider">
                  ACTION SIGN #{activeItemModal.videoIndex} OF 38 • LESSON & DETAILS
                </span>
                <h3 className="text-2xl font-black text-[#4b4b4b] dark:text-white">
                  {isHindi ? activeItemModal.titleHindi : activeItemModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItemModal(null)}
                className="p-2 rounded-2xl bg-[#f0f0f0] dark:bg-[#202f36] text-[#777] dark:text-white hover:bg-[#e5e5e5] dark:hover:bg-[#37464f] transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
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
              <span>▶ Watch "{activeItemModal.title}" Video #{activeItemModal.videoIndex || 1} on YouTube</span>
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
                    <span className="text-[11px] font-bold text-[#1cb0f6]">
                      🔄 Movement: {activeItemModal.movement}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-3.5 bg-[#f7f7f7] dark:bg-[#131f24] rounded-xl border border-[#e5e5e5] dark:border-[#37464f]">
                <strong className="text-xs font-black text-[#1cb0f6] block mb-1">
                  📝 Description / विवरण:
                </strong>
                <p className="text-xs font-bold text-[#4b4b4b] dark:text-[#d0d0d0]">
                  {isHindi ? activeItemModal.descriptionHindi : activeItemModal.description}
                </p>
              </div>

              {/* Gesture Technique */}
              <div className="p-3.5 bg-[#f7f7f7] dark:bg-[#131f24] rounded-xl border border-[#e5e5e5] dark:border-[#37464f]">
                <strong className="text-xs font-black text-[#58cc02] block mb-1">
                  ✋ Gesture Technique / सांकेतिक विधि:
                </strong>
                <p className="text-xs font-medium text-[#4b4b4b] dark:text-[#d0d0d0]">
                  {activeItemModal.gestureTip}
                </p>
              </div>

              {/* ISL SOV Sentence Placement */}
              <div className="p-3.5 bg-[#f7f7f7] dark:bg-[#131f24] rounded-xl border border-[#e5e5e5] dark:border-[#37464f]">
                <strong className="text-xs font-black text-[#ff9600] block mb-1">
                  💡 ISL Sentence Placement / वाक्य रचना:
                </strong>
                <p className="text-xs font-bold text-[#4b4b4b] dark:text-[#d0d0d0]">
                  {activeItemModal.sovContext}
                </p>
              </div>

            </div>

            {/* Bottom Actions: External YouTube Link + Close Button */}
            <div className="pt-4 border-t border-[#e5e5e5] dark:border-[#37464f] flex items-center justify-between gap-3">
              <a
                href={activeItemModal.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#ff0000] hover:bg-[#cc0000] text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Open in YouTube ↗</span>
              </a>

              <button
                onClick={() => setActiveItemModal(null)}
                className="py-2.5 px-6 rounded-xl bg-[#58cc02] hover:bg-[#46a302] text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all"
              >
                {isHindi ? 'बंद करें' : 'Close Details'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
