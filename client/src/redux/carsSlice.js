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
    
      
    
//         [updateDonation.fulfilled]: (state, { payload }) => {
//             let patchedDonation = state.user.donations.filter((donation) => donation.id == payload.id)[0]
//             patchedDonation = {...patchedDonation, amount: payload.amount}
//             state.user = {...state.user, donations: state.user.donations.map((d) => {
//                 return d.id !== patchedDonation.id ? d : patchedDonation
//             })}
//             state.isFetching = false;
//             state.isSuccess = true;
//             console.log("in the reducer", payload)
//             return state;
//             },
//         [updateSumDonations.fulfilled]: (state, { payload }) => {
//             let updatedRecipient = state.user.recipients.filter((recipient) => {
//                 return recipient.id === payload.id
//             })[0]
//             updatedRecipient = {...updatedRecipient, sum_donations: payload.sum_donations}
//             state.user = {...state.user, recipients: state.user.recipients.map((r) => {
//                 return r.id !== updatedRecipient.id ? r : updatedRecipient
//             })}
//             state.isFetching = false;
//             state.isSuccess = true;
//             state.isError = false;
//             console.log("payload:", payload)
//             console.log("updatedRecipient:", updatedRecipient)
//             return state;
//         },
//     },
//   })
  
  export const { clearState } = carsSlice.actions;
