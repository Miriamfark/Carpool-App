//do I need this slice? post and delete in regular react  
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postCarpool = createAsyncThunk('carpools/postCarpool', async (car) => {
    const newCarpool = await fetch('/carpools', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(car)
    })
    const data = await newCarpool.json()
    console.log(data)
        if (!data.ok) {
        throw new Error(data.error)
    } else {
        return data
    }
        
})

export const deleteCarpool = createAsyncThunk('carpools/deleteCarpool', async (carpoolData) => {
    const carpool = await fetch(`/carpools/delete`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(carpoolData) })

    const data = await carpool.json()
    console.log(data)
    return data
})


export const carpoolsSlice = createSlice({
    name: "carpools",
    initialState: {
        carpools: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = false
            return state;
    },
    },
    extraReducers: {
        [postCarpool.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.cars = [...state.cars, ]
        //     let patchedKid = state.user.kids.filter((kid) => kid.id == payload.id)[0]
        // patchedKid = {...patchedKid, name: payload.name, school: payload.school, dimissal_time: payload.dismissal_time}
        // state.user = {...state.user, kids: state.user.kids.map((k) => {
        //     return k.id !== patchedKid.id ? k : patchedKid
        // })}
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [postCarpool.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.error.message;
            console.log(payload.error.message)
        },
        [deleteCarpool.fulfilled]: (state, { payload }) => {
            state.isSuccess = true
        }
    }
})

  
  export const { clearState } = carpoolsSlice.actions;
