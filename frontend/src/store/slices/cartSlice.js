import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartSlice = createSlice({
    name: "cart",
    initialState:[],
    reducers:{
        
            add(state, action){
                state.push(action.payload)
            },

            remove(state, action) {
                return state.filter((product) => product._id !== action.payload); // Remove item by _id
              },
              clear(state) {
                return []; // Clear all items from cart
              },
            
            
        
    }
})

export const {add, remove} = cartSlice.actions;
export default cartSlice.reducer;