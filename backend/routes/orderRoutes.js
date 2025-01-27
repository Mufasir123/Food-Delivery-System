import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
    createOrder,
    getUserOrders
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/createorder', authMiddleware, createOrder);
router.get('/getorder', authMiddleware, getUserOrders);

export default router;

