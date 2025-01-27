import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    availability: {
        type: Boolean,
        default: true
    }
});

export const Menu = mongoose.model('Menu', menuSchema);
export default Menu;