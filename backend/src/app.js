import express from 'express';
import cors from 'cors';
import apiRouter, { goalRouter } from './routes/routes.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRouter);

// Legacy compatibility with the original frontend/back routes.
app.use('/goals', goalRouter);

export default app;
