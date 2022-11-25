import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, sortEarlyToLate } from "../helpers";

export const updateUser = createAsyncThunk('user/updateUser', async (args, {rejectWithValue}) => {
    const {endpoint, bodyObj} = args
    const res = await fetch(`${getApi()}/${endpoint}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    })
    if(res.ok){
        const updatedUser = await res.json()
        return updatedUser
    } else {
        return rejectWithValue("Something went wrong with your request. Please try again later")
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: "",
        status: "idle"
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                sortEarlyToLate(action.payload.appointments) //sort the users appointments from early to late before updating the user
                state.data = action.payload
            })
            .addCase(updateUser.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export default userSlice.reducer

export const {setStatus} = userSlice.actions
export const selectUser = state => state.user.data
export const selectStatus = state => state.user.status