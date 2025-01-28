import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
    clearOrderHistory,
    createOrder,
    getUserOrders
} from '../controllers/orderController.js';

const router = express.Router();


router.post('/createorder', authMiddleware, createOrder);
router.get('/getorder', authMiddleware, getUserOrders);
router.delete('/delete/:id', authMiddleware, clearOrderHistory);

export default router;

