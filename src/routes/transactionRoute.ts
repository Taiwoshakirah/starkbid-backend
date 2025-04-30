import { Router } from 'express';
import { getTransactions } from '../controllers/transaction';

const router = Router();

router.get('/transactions/:wallet', getTransactions);

export default router;
