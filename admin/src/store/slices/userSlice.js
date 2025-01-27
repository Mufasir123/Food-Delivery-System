import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        profile:null
    },
    reducers:{
        getUser:(state, action)=>{
            state.user = action.payload
        },
        
    }
    
})

export const {getUser} = userSlice.actions;
export default userSlice.reducer;