import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

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

export const updateCar = createAsyncThunk('cars/updateCar', async (updatedCar) => {
    const car = await fetch(`/my_cars/${updatedCar.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCar)
    })
    return car.json()
} )

export const deleteCar = createAsyncThunk('cars/deleteCar', async (carId) => {
    const car = await fetch(`cars/${carId}`, { method: "DELETE" })
    return carId
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
    }
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
            state.cars = [...state.cars, payload];
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [updateCar.fulfilled]: (state, { payload }) => {
            const updatedCars = state.cars.map((car) => {
              if (car.id === payload.id) {
                return {
                  ...car,
                  school: payload.school, 
                  dimissal_time: payload.dismissal_time,
                  seats_available: payload.seats_available,
                  monday: payload.monday,
                  tuesday: payload.tuesday,
                  wedensday: payload.wednesday,
                  thursday: payload.thursday,
                  friday: payload.friday
                };
              }
              return car;
            });
            state.cars = updatedCars;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          },
            [deleteCar.fulfilled]: (state, { payload }) => {
                const filteredCars = state.cars.filter((car) => car.id !== payload)
                state.cars = filteredCars
                state.isFetching = false;
                state.isSuccess = true;
                state.isError = false;
                return state;
                },
    }
})

  
  export const { clearState, addKidToCarpool } = carsSlice.actions;
