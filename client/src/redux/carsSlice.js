import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk('cars/getCars', async () => {
    const getCars = await fetch('/cars');
    const cars = await getCars.json()
    return cars
});

export const postCar = createAsyncThunk('cars/postCar', async (carData) => {
    const newCar = await fetch('/cars', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(carData)
    })
    const data = await newCar.json()
    return data
})

export const filterCars = createAsyncThunk('cars/filterCars', async (query) => {
    const cars = await fetch(`/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    })
    const data = await cars.json()
    return data
})


export const carsSlice = createSlice({
    name: "cars",
    initialState: {
        cars: [],
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
        [fetchCars.fulfilled]: (state, { payload }) => {
            state.cars = payload;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          },
        [fetchCars.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload;
          },
        [fetchCars.pending]: (state) => {
            state.isFetching = true;
          }, 
        [filterCars.fulfilled]: (state, { payload }) => {
            state.cars = payload
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },

    [postCar.fulfilled]: (state, { payload }) => {
        console.log(payload)
        state.cars = [...state.cars, payload];
        state.isFetching = false;
        state.isSuccess = true;
        return state;
        },
  
    }
})

  
  export const { clearState } = carsSlice.actions;
