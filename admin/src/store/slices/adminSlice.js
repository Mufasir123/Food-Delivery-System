import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name:"items",
    initialState:{
        data:[]
    },
    reducers:{
        addItem:(state, actions)=>{
            state.data = actions.payload
        }
    }
})

export const {addItem }= adminSlice.actions
export default adminSlice.reducer;