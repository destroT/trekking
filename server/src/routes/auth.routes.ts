import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { signIn, signUp, all, me, logOut } from '../controllers/user.controller';
const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', isAuth, logOut);
router.get('/me', isAuth, me);
router.get('/', isAuth, all);

export default router;