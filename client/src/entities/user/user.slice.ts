import { createSlice } from "@reduxjs/toolkit";
import type { User } from "./types/user.types";




const initialState: { user: User | null } = { user: null };


const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        
    }
})

export const { actions, reducer } = UserSlice;