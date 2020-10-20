import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { create, del } from '../controllers/route.controller';
import validateId from '../middlewares/validateId';
const router = Router();

router.post('/', isAuth, create);
// router.get('/getAll', getAll);
// router.get('/:id', validateId, get);
router.delete('/:id', isAuth, validateId, del);
// router.post('/upvote', isAuth, like);

export default router;