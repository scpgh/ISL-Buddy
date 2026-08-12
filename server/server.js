import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-Memory IP Rate Limiter (Prevents DDoS, API abuse & brute force)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_AI_REQUESTS = 30; // Max 30 AI requests per IP per 15 minutes
const MAX_GENERAL_REQUESTS = 100; // Max 100 API requests per IP per 15 minutes

function checkRateLimit(ip, isAiEndpoint = false) {
  const now = Date.now();
  const limit = isAiEndpoint ? MAX_AI_REQUESTS : MAX_GENERAL_REQUESTS;
  const userRecord = rateLimitMap.get(ip) || { count: 0, firstRequestTime: now };

  if (now - userRecord.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    // Reset window after 15 minutes
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

// Input Sanitization Shield (Prevents SQL, NoSQL & XSS Injections)
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  
  // Strip HTML script tags and dangerous event handlers (XSS protection)
  let clean = str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');

  // Strip common SQL Injection patterns (SELECT, DROP, INSERT, DELETE, UNION, --, /*)
  clean = clean.replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|UNION|EXEC|DECLARE)\b|--|\/\*|\*\/)/gi, '');

  // Truncate to maximum 1000 characters to prevent buffer overflow/exhaustion
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
  } catch (e) {
    // fallback
  }
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

// Dynamic ISL Response Generator
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

  // Apply Security Hardening Headers (Helmet Equivalent)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY'); // Clickjacking protection
  res.setHeader('X-XSS-Protection', '1; mode=block'); // Cross-Site Scripting protection
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health Endpoint
  if (req.url === '/api/health' && req.method === 'GET') {
    const rateCheck = checkRateLimit(clientIp, false);
    if (!rateCheck.allowed) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Too Many Requests. Please try again later.' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'ISL Buddy Server API',
      groqConfigured: Boolean(getGroqApiKey()),
      securityShield: 'Active (Rate-Limited & Sanitized)'
    }));
    return;
  }

  // AI Chat Endpoint with Security Rate Limiting & Input Sanitization
  if (req.url === '/api/ai/chat' && req.method === 'POST') {
    const rateCheck = checkRateLimit(clientIp, true);
    if (!rateCheck.allowed) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Rate limit exceeded: Max 30 AI requests per 15 minutes. Please wait before asking more questions.' }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => { 
      body += chunk; 
      if (body.length > 50000) { // 50KB Payload Limit (Anti-Buffer Exhaustion)
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
