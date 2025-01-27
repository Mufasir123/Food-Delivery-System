import { createSlice } from "@reduxjs/toolkit";



const foodSlice = createSlice({
    name:"food",
    initialState:{
        data:[]
    },
    reducers:{
        getFoodList:(state, action)=>{
            state.data = action.payload
        },
        updateOrder: (state, action) => {
            const updatedOrder = action.payload; // Assuming payload is a single order object
            const index = state.data.findIndex((order) => order.id === updatedOrder.id);
      
            if (index !== -1) {
              // Update existing order
              state.data[index] = updatedOrder;
            } else {
              // Add new order if it doesn't exist
              state.data.push(updatedOrder);
            }
          },
    }
})

export const {getFoodList, updateOrder} =  foodSlice.actions;
export default foodSlice.reducer