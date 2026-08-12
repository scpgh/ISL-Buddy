import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Mudra Learn Production Express API Server',
    groqConfigured: Boolean(process.env.GROQ_API_KEY)
  });
});

export default router;
