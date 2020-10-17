import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { signIn, signUp, me } from '../controllers/user.controller';
const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/me', isAuth, me);
export default router;