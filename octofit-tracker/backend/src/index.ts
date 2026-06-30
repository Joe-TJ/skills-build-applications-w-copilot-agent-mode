import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectDatabase, MONGODB_URI } from './config/database';
import { createApiRouter } from './routes';

dotenv.config();

const app = express();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use('/api', createApiRouter(apiBaseUrl));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port: PORT,
    apiBaseUrl,
    mongoUri: MONGODB_URI,
  });
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
  });
});

const start = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
};

void start();
