import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchCars = createAsyncThunk('cars/getCars', async () => {
//     const getCars = await fetch('/cars');
//     const cars = await getCars.json()
//     return cars
// });

export const postCarpool = createAsyncThunk('carpools/postCarpool', async (car) => {
    const newCarpool = await fetch('/carpools', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(car)
    })
    const data = await newCarpool.json()
    return data
})

// export const deleteCarpool = createAsyncThunk('carpools/deleteCarpool', async (id) => {
//     const carpool = await fetch(`/carpools/${}`, { method: "DELETE" })
//     return id
// })


// export const searchCars = createAsyncThunk('cars/searchCars', async (searchData) => {
//     const cars = await fetch('/search_cars', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(searchData)
//     })
//     const data = await cars.json()
//     console.log(data)
//     return data
// })

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
        state.carpools = [...state.carpools, payload];
        state.isFetching = false;
        state.isSuccess = true;
        return state;
        },
    }
})

  
  export const { clearState } = carpoolsSlice.actions;
