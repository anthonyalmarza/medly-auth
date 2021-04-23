import { RequestHandler, Router } from 'express';
import { verifyToken } from './middleware';

export const healthCheck: RequestHandler = (_, res) => res.json({ status: 'Service is up and running' });

const router = Router();

router.get('/healthCheck', healthCheck);

router.use(verifyToken);

export default router;
