import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const distDir = path.resolve(__dirname, 'dist');
const distIndex = path.join(distDir, 'index.html');
const isDevMode =
  process.argv.includes('--dev') || process.env.npm_lifecycle_event === 'dev';
const isProduction =
  process.env.NODE_ENV === 'production' ||
  (!isDevMode && fs.existsSync(distIndex));

interface BookingPayload {
  fullName?: string;
  company?: string;
  email?: string;
  serviceTitle?: string;
  viewCount?: number;
  cadStatus?: string;
  consultationDate?: string;
  targetDelivery?: string;
  notes?: string;
  estimatedDays?: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'b-render-architectural-studio' });
  });

  app.post('/api/bookings', (req: Request, res: Response) => {
    const body = (req.body ?? {}) as BookingPayload;
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const consultationDate =
      typeof body.consultationDate === 'string' ? body.consultationDate.trim() : '';

    if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consultationDate) {
      res.status(400).json({ error: 'Valid name, email, and consultation date are required.' });
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000);
    res.status(201).json({
      referenceId: `BR-2026-${code}`,
      fullName,
      email,
      company:
        typeof body.company === 'string' && body.company.trim()
          ? body.company.trim()
          : 'Independent Practice',
      serviceTitle:
        typeof body.serviceTitle === 'string' && body.serviceTitle.trim()
          ? body.serviceTitle.trim()
          : 'Exterior Architectural Stills',
      viewCount: typeof body.viewCount === 'number' ? body.viewCount : 1,
      consultationDate,
      estimatedDays:
        typeof body.estimatedDays === 'string' && body.estimatedDays.trim()
          ? body.estimatedDays.trim()
          : '5–7 Business Days',
    });
  });

  if (isProduction && fs.existsSync(distIndex)) {
    app.use(express.static(distDir, { maxAge: '7d' }));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(distIndex);
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`B-Render Architectural Studio listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
