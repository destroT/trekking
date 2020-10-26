import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { add, like, get, getAll, del } from '../controllers/review.controller';
import validateId from '../middlewares/validateId';
const router = Router();

router.post('/add', isAuth, add);
router.get('/', getAll);
router.get('/:id', validateId, get);
router.delete('/:id', isAuth, validateId, del);
router.post('/vote', isAuth, like);

export default router;
