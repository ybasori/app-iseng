import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Optional for local

const app = express();
app.use(express.json());

// Root route to avoid Railway 502
app.get('/', (_req: Request, res: Response) => {
  res.send('🚀 Hello from Express + TypeScript on Railway!');
});

// Sample API route
app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from API!' });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).send('Internal Server Error');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
