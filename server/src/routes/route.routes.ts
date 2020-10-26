import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import {
	create,
	del,
	get,
	getAll,
	like
} from '../controllers/route.controller';
import validateId from '../middlewares/validateId';
const router = Router();

router.post('/', isAuth, create);
router.get('/', getAll);
router.get('/:id', validateId, get);
router.delete('/:id', isAuth, validateId, del);
router.post('/vote', isAuth, like);

export default router;
