import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { body } from 'express-validator';
import { createUser } from './db';
import { verifyToken } from './middleware';

export const healthCheck: RequestHandler = (_, res) => res.json({ status: 'Service is up and running' });

const router = Router();

router.get('/healthCheck', healthCheck);

/** create user endpoint */
router.post(
    'signup',
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    async (req: Request, res: Response, next: NextFunction) => {
        const { password } = req.body;
        const { id } = await createUser({ password });
        return res.status(201).json({ id });
    }
);

router.use(verifyToken);

/** NOTE: After this point - authenticated requests only */

export default router;
