import app from 'app';
import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { body } from 'express-validator';
import { verifyToken } from './middleware';

export const healthCheck: RequestHandler = (_, res) => res.json({ status: 'Service is up and running' });

const router = Router();

router.get('/healthCheck', healthCheck);

router.use(verifyToken);

// userId, created, passwordHash, lastedLogin

/** create user endpoint */
interface IUserSignUpInput {
    password: string;
}

interface IUserSignUpOutput {
    userId: string;
}

const createUser = async (inputs: IUserSignUpInput) => Promise.resolve({ id: 'some-uuid/perhaps-ksuid-if-dynamodb' });

app.post(
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

export default router;
