import Menu from '../models/menuModel.js';

export const createMenuItem = async (req, res) => {
    try {
        const { name, category, price, availability } = req.body;
        let image_filename = `${req.file.filename}`;
        const menuItem = new Menu({ 
            name, 
            category, 
            price, 
            availability: availability !== undefined ? availability : true ,
            image:image_filename
        });
        await menuItem.save();
        res.status(201).json({
            success:true,
            message:"Added successfully",
            menuItem
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find({});
        
        res.json({
            success:true,
            message:"All items are feacted successfully",
            menuItems});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        console.log("Updated data",updateData, id);
        
        
        const updatedItem = await Menu.findByIdAndUpdate(id, updateData, { 
            new: true,
            runValidators: true 
        });

        if (!updatedItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.json({
            success:true,
            message:"Menu items updated successfully",
            updatedItem});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Menu.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};