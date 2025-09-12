import { Router } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.resolve(process.cwd(), 'src', 'data', 'requirements.json');

function matchRequirements(answers, dataset) {
  const { areaSqm = 0, seats = 0, features = [] } = answers || {};
  return dataset.filter((rule) => {
    const sizeOk = !rule.minArea || areaSqm >= rule.minArea;
    const areaOkMax = !rule.maxArea || areaSqm <= rule.maxArea;
    const seatsMinOk = !rule.minSeats || seats >= rule.minSeats;
    const seatsMaxOk = !rule.maxSeats || seats <= rule.maxSeats;
    const hasReqFeatures = (rule.requiredFeatures || []).every((f) => features.includes(f));
    const notBlocked = !(rule.blockIfFeatures || []).some((f) => features.includes(f));
    return sizeOk && areaOkMax && seatsMinOk && seatsMaxOk && hasReqFeatures && notBlocked;
  });
}

router.post('/', async (req, res) => {
  try {
    const { business } = req.body;
    if (!business) return res.status(400).json({ error: 'Missing business' });
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const dataset = JSON.parse(raw);
    const matched = matchRequirements(business, dataset);

    const system = `You are a professional business licensing consultant in Israel specializing in restaurant licensing. Your task is to generate a comprehensive Hebrew report for restaurant owners.

CRITICAL REQUIREMENTS:
- Output MUST be entirely in Hebrew
- Use simple, clear language that any business owner can understand
- Avoid technical jargon or formal bureaucratic language
- Write as if explaining to a friend who is unfamiliar with the field
- Do NOT copy or repeat exact phrases from the provided data - explain everything in your own words using simpler language

REPORT STRUCTURE:
1. Opening: Start with a warm, brief congratulatory message to the business owner for opening their restaurant
2. Main Content: Organize by categories (Israel Police, Ministry of Health, Fire and Rescue Services)
3. Include priorities and practical next steps for each category
4. Closing: End with a brief, encouraging summary of the next steps

TONE: Professional yet friendly, supportive, and encouraging. Make the business owner feel confident about their journey while being clear about requirements.`;

    const user = JSON.stringify({ profile: business, matched });

    let text = '';
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.9,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ]
      });
      text = response.choices[0].message.content;
    } catch (llmError) {
      const msg = llmError?.message || 'AI error';
      text = `שגיאה בהפקת דוח AI: ${msg}`;
    }

    res.json({ matched, report: text });
  } catch (e) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;
