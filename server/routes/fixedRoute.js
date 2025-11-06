import { Router } from 'express';
import {fixedLists, fixedSet} from '../controllers/fixedController.js';
const router = Router();

router.get('/', fixedLists);
router.post('/', fixedSet);


export default router