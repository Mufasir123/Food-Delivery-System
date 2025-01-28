import Order from '../models/orderModel.js';
import Menu from '../models/menuModel.js';

export const createOrder = async (req, res) => {
    try {
    
        const { items } = req.body;
        const userId = req.user._id;

        // Validate menu items and calculate total
        const menuItems = await Menu.find({ 
            _id: { $in: items.map(item => item.menuItem) } 
        });

        const totalAmount = items.reduce((total, orderItem) => {
            const menuItem = menuItems.find(m => 
                m._id.toString() === orderItem.menuItem
            );
            
            if (!menuItem) {
                throw new Error(`Menu item not found: ${orderItem.menuItem}`);
            }

            return total + (menuItem.price * orderItem.quantity);
        }, 0);

        // Create order
        const order = new Order({
            userId,
            items,
            totalAmount,
            status: 'Pending'
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ 
            userId: req.user._id 
        }).populate('items.menuItem');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const clearOrderHistory = async (req, res)=>{
    try {
        const {id} = req.params
        const orders = await Order.deleteMany({id})

        if(!orders.deletedCount === 0){

            return res.status(400).json({
                message:"No orders found for this user",
                success:false
            })
        }

        return res.status(200).json({
            message:"Orders deleted Successfully",
            success:true
        })
    } catch (error) {
        console.error("Error clearing order history:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}