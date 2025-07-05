
import { Router } from "express";
import { registerUser, loginUser } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';
import { refreshSession } from '../controllers/auth.js';
import { logoutUser } from '../controllers/auth.js';


const router = Router();

router.post('/register', validateBody(registerSchema), registerUser);
router.post('/login', validateBody(loginSchema), loginUser);
router.post('/refresh', refreshSession);
router.post('/logout', logoutUser);

export default router;

