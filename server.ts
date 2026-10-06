import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Health check endpoint for Cloud Run deployment checks
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Joan Andrews Denture Clinic' });
});

// Consultation request endpoint
app.post('/api/consultations', (req, res) => {
  console.log('Consultation request received:', req.body);
  res.json({ success: true, message: 'Consultation request received' });
});

// Serve static assets from dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
