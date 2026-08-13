import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists for persistent multi-browser sync
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');

function loadJsonData(filePath, fallback = {}) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {}
  return fallback;
}

function saveJsonData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error(`Failed to save data to ${filePath}:`, e);
  }
}

// In-Memory IP Rate Limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_AI_REQUESTS = 30;
const MAX_GENERAL_REQUESTS = 200;

function checkRateLimit(ip, isAiEndpoint = false) {
  const now = Date.now();
  const limit = isAiEndpoint ? MAX_AI_REQUESTS : MAX_GENERAL_REQUESTS;
  const userRecord = rateLimitMap.get(ip) || { count: 0, firstRequestTime: now };

  if (now - userRecord.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return { allowed: true, remaining: limit - 1 };
  }

  if (userRecord.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  userRecord.count += 1;
  rateLimitMap.set(ip, userRecord);
  return { allowed: true, remaining: limit - userRecord.count };
}

// Input Sanitization Shield
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  let clean = str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');

  clean = clean.replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|UNION|EXEC|DECLARE)\b|--|\/\*|\*\/)/gi, '');
  return clean.trim().slice(0, 1000);
}

function getGroqApiKey() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.startsWith('GROQ_API_KEY=')) {
          const val = line.replace('GROQ_API_KEY=', '').trim();
          if (val && !val.includes('your_private_groq_api_key')) {
            return val;
          }
        }
      }
    }
  } catch (e) {}
  return process.env.GROQ_API_KEY || '';
}

const PORT = process.env.PORT || 5000;
const SYSTEM_PROMPT = `
You are ISL Buddy, an intelligent AI instructor specialized in Indian Sign Language (ISL) and Deaf Culture.

Provide a detailed, helpful breakdown for the query:
1. ✋ Hand Placement & Gesture
2. 🔄 ISL SOV Syntax Order (Subject ➔ Object ➔ Verb)
3. 😊 Facial Expression & Signals
4. 💡 Practice Drill
`;

function generateDynamicISLGuide(prompt) {
  const clean = sanitizeInput(prompt);
  const words = clean.split(/\s+/);
  const mainWord = words[words.length - 1] || clean;

  let handshape = `Form your active dominant hand cleanly at chest height in your 3D signing space.`;
  let sovRule = `Subject ➔ Object ➔ Verb (SOV)`;
  let facialSignal = `Maintain direct eye contact with a calm, friendly expression.`;

  const lower = clean.toLowerCase();

  if (lower.includes('hello') || lower.includes('namaste')) {
    handshape = `Join both palms together at chest level with fingers pointing upward softly.`;
    sovRule = `Greeting sign performed at the start of interaction.`;
    facialSignal = `Gentle smile with a slight bow of the head.`;
  } else if (lower.includes('thank')) {
    handshape = `Touch fingertips of dominant hand to chin and move outward towards the listener.`;
    sovRule = `Politeness marker performed directly after the favor.`;
    facialSignal = `Warm, appreciative eye contact.`;
  } else if (lower.includes('where') || lower.includes('what') || lower.includes('who') || lower.includes('how') || lower.includes('why')) {
    sovRule = `[Subject / Location] ➔ [Question Word at the VERY END]`;
    facialSignal = `Furrow eyebrows slightly and lean forward when signing question words.`;
  } else if (words.length > 2) {
    const sub = words[0];
    const verb = words[words.length - 1];
    const obj = words.slice(1, words.length - 1).join(" ");
    sovRule = `Original: "${clean}" ➔ ISL Order: "${sub} ${obj} ${verb}".`;
  }

  return `🤟 **ISL Buddy AI Guide**:

To sign **"${clean}"** in Indian Sign Language:

1. ✋ **Hand Placement & Gesture**:
   • ${handshape}
   • Execute the motion smoothly inside your 3D chest signing box.

2. 🔄 **ISL SOV Syntax Order**:
   • ${sovRule}

3. 😊 **Facial Expression & Signals**:
   • ${facialSignal}

4. 💡 **Instructor Practice Tip**:
   • Practice fingerspelling "${mainWord}" using the standard two-handed ISL manual alphabet for clarity!`;
}

const server = http.createServer(async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health Endpoint
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'ISL Buddy Server API',
      groqConfigured: Boolean(getGroqApiKey()),
      securityShield: 'Active (Rate-Limited & Cloud-Synced)'
    }));
    return;
  }

  // Global Leaderboard Endpoints
  if (req.url === '/api/leaderboard' && req.method === 'GET') {
    const list = loadJsonData(LEADERBOARD_FILE, []);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(list));
    return;
  }

  if (req.url === '/api/leaderboard' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const item = JSON.parse(body || '{}');
        if (item && item.uid) {
          let list = loadJsonData(LEADERBOARD_FILE, []);
          const idx = list.findIndex(u => u.uid === item.uid);
          if (idx !== -1) {
            list[idx] = { ...list[idx], ...item };
          } else {
            list.push(item);
          }
          list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
          saveJsonData(LEADERBOARD_FILE, list);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Cloud User Progress Sync Endpoints
  if (req.url.startsWith('/api/progress/') && req.method === 'GET') {
    const uid = req.url.replace('/api/progress/', '').trim();
    if (!uid) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'UID required' }));
      return;
    }
    const allUsers = loadJsonData(USERS_FILE, {});
    const progress = allUsers[uid] || null;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ progress }));
    return;
  }

  if (req.url.startsWith('/api/progress/') && req.method === 'POST') {
    const uid = req.url.replace('/api/progress/', '').trim();
    if (!uid) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'UID required' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const progress = JSON.parse(body || '{}');
        if (progress) {
          const allUsers = loadJsonData(USERS_FILE, {});
          allUsers[uid] = progress;
          saveJsonData(USERS_FILE, allUsers);

          // Auto-sync user to central leaderboard
          let list = loadJsonData(LEADERBOARD_FILE, []);
          const name = progress.username || progress.user?.displayName || progress.user?.email?.split('@')[0] || 'Learner';
          const xp = progress.xp || 0;
          const idx = list.findIndex(u => u.uid === uid);
          if (idx !== -1) {
            list[idx] = { ...list[idx], uid, name, xp, isUser: true, avatar: "🤟" };
          } else {
            list.push({ uid, name, location: "India", xp, avatar: "🤟", isUser: true });
          }
          list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
          saveJsonData(LEADERBOARD_FILE, list);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // AI Chat Endpoint
  if (req.url === '/api/ai/chat' && req.method === 'POST') {
    const rateCheck = checkRateLimit(clientIp, true);
    if (!rateCheck.allowed) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Rate limit exceeded: Max 30 AI requests per 15 minutes.' }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => { 
      body += chunk; 
      if (body.length > 50000) {
        req.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const rawPrompt = parsed.prompt || '';
        const cleanPrompt = sanitizeInput(rawPrompt);

        if (!cleanPrompt) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Valid prompt is required' }));
          return;
        }

        const apiKey = getGroqApiKey();
        let aiResponse = null;

        if (apiKey) {
          const models = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'mixtral-8x7b-32768'];

          for (const model of models) {
            try {
              const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                  model: model,
                  messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: cleanPrompt }
                  ],
                  temperature: 0.7,
                  max_tokens: 500
                })
              });

              if (groqRes.ok) {
                const data = await groqRes.json();
                aiResponse = data.choices[0]?.message?.content;
                if (aiResponse) {
                  console.log(`[Groq AI Security OK] Replying for "${cleanPrompt}" with ${model}`);
                  break;
                }
              }
            } catch (e) {
              console.warn(`[Groq AI Model ${model} Exception]:`, e.message);
            }
          }
        }

        if (!aiResponse) {
          aiResponse = generateDynamicISLGuide(cleanPrompt);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: aiResponse }));

      } catch (err) {
        console.error('Server error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint Not Found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 ISL Buddy Secure API running on http://localhost:${PORT}`);
});
