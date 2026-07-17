import express from 'express';
import cors from 'cors';
import emailRouter from './email.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // accept large PDF payloads
app.use('/api', emailRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
});
