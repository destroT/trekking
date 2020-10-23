import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
//import validateId from '../middlewares/validateId'
import { create, getAll } from '../controllers/comment.controller';

const router = Router();

router.post('/', isAuth, create);
router.get('/', getAll);
// router.get('/:id', validateId, get);
// router.delete('/:id', isAuth, validateId, del);
// router.post('/upvote', isAuth, like);

export default router;