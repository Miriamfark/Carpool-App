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

export const updateSeatsAvailable = createAsyncThunk('cars/updateSeatsAvailable', async (carId) => {
    const updatedCar = await fetch(`/cars/${carId}/seats`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(carId)
    })
    const data = await updatedCar.json()
    return data
})

export const filterCars = createAsyncThunk('cars/filterCars', async (query) => {
    const cars = await fetch(`/search/${query}`)
    const data = await cars.json()
    console.log(data)
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
        // [searchCars.fulfilled]: (state, { payload }) => {
        //     state.cars = payload
        //     state.isFetching = false;
        //     state.isSuccess = true;
        //     return state;
        // },
    //     [signupUser.fulfilled]: (state, { payload }) => {
    //       state.isFetching = false;
    //       state.isSuccess = true;
    //       state.user = payload
    //   },
    //   [signupUser.pending]: (state) => {
    //       state.isFetching = true;
    //   },
    //   [signupUser.rejected]: (state, { payload }) => {
    //       state.isFetching = false;
    //       state.isError = true;
    //       state.errorMessage = payload.error;
    //   },
    //   [loginUser.fulfilled]: (state, { payload }) => {
    //       state.user = payload;
    //       state.isFetching = false;
    //       state.isSuccess = true;
    //       state.isError = false;
    //       console.log("login fulfilled", state)
    //       return state;
    //   },
    //   [loginUser.rejected]: (state) => {
    //       state.isFetching = false;
    //       state.isError = true;
    //       state.errorMessage = "Invalid username or password";
    //   },
    //   [loginUser.pending]: (state) => {
    //       state.isFetching = true;
    //   },   
    //   [logoutUser.fulfilled]: (state) => {
    //     state.user = null;
    //     state.isFetching = false;
    //     state.isSuccess = true;
    //     state.isError = false;
    //     console.log("logged out!")
    //     return state;
    //     },
    [postCar.fulfilled]: (state, { payload }) => {
        console.log(payload)
        state.cars = [...state.cars, payload];
        state.isFetching = false;
        state.isSuccess = true;
        return state;
        },
    [updateSeatsAvailable.fulfilled]: (state, { payload }) => {
            let patchedCar = state.cars.filter((car) => car.id == payload.id)[0]
            patchedCar = {...patchedCar, seats_available: payload.seats_available}
            state.cars = state.cars.map((c) => {
                return c.id !== patchedCar.id ? c : patchedCar
            })
            state.isFetching = false;
            state.isSuccess = true;
            console.log("update seats", payload)
            return state;
            },
    // [removeKid.fulfilled]: (state, { payload }) => {
    //     const filteredKids = state.user.kids.filter((kid) => kid.id !== payload)
    //     state.user.kids = filteredKids
    //     state.isFetching = false;
    //     state.isSuccess = true;
    //     state.isError = false;
    //     return state;
    //     },
    }
})




//       [fetchUser.fulfilled]: (state, { payload }) => {
//           state.user = payload;
//           state.isFetching = false;
//           state.isSuccess = true;
//           return state;
//       },
//       [fetchUser.rejected]: (state, { payload }) => {
//           state.isFetching = false;
//           state.isError = true;
//           state.errorMessage = payload.error;
//       },
//       [fetchUser.pending]: (state) => {
//           state.isFetching = true;
//       },

  
  export const { clearState } = carsSlice.actions;
