import { NextApiRequest, NextApiResponse } from 'next';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const requestData = req.body;
      
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const result = await model.generateContent(requestData);
      const response = await result.response;
      console.log(response.text())
      res.status(200).json(response.text());
    } catch (error) {
      console.error('Error generating health data:', error);
      res.status(500).json({ error: 'Failed to generate health data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}