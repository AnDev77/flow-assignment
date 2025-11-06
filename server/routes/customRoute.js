import { Router } from 'express';
import {fixedLists, fixedSet} from '../controllers/fixedController.js';
import { customLists, deleteCustom, postCustom } from '../controllers/customController.js';
import { validateExt } from '../middleware/validateExt.js';
const router = Router();

router.get('/', customLists);
router.post('/', validateExt, postCustom);
router.delete('/:id', deleteCustom);

export default router