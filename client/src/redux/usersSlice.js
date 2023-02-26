import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk('user/logout', async () => {
    const userLogout = await fetch(`/logout`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
});

export const fetchUser = createAsyncThunk('user/getUser', async () => {
       const getUser = await fetch('/me');
        const user = await getUser.json()
        if(getUser.status === 200) {
            return user
        } else {
            return null
        }
  
    });

export const postKid = createAsyncThunk('user/addKid', async (kid) => {
 const newKid = await fetch('/kids', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(kid)
})

const data = await newKid.json()
    return data
       
    })

export const removeKid = createAsyncThunk('user/removeKid', async (id) => {
    const kid = await fetch(`/kids/${id}`, { method: "DELETE" })
    return id;
})

export const updateKid = createAsyncThunk('user/updateKid', async (updatedKid) => {
    const theKid = await fetch(`/kids/${updatedKid.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedKid)
          })
          return theKid.json()
})

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: {} ,
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
        signupUser: (state, data) => {
            state.user = data.payload
        },
        loginUser: (state, data) => {
            state.user = data.payload
        },
        removeCar: (state, payload) => {
            const filteredCars = state.user.cars.filter((car) => car.id !== payload.payload)
            state.user.cars = filteredCars
            return state
        },
        updateUserCar: (state, payload) => {
            let patchedCar = state.user.cars.filter((car) => car.id == payload.payload.id)[0]
            patchedCar = {...patchedCar,  
                school: payload.payload.school, 
                dimissal_time: payload.payload.dismissal_time,
                seats_available: payload.payload.seats_available,
                monday: payload.payload.monday,
                tuesday: payload.payload.tuesday,
                wedensday: payload.payload.wednesday,
                thursday: payload.payload.thursday,
                friday: payload.payload.friday}
            state.user = {...state.user, cars: state.user.cars.map((c) => {
                return c.id !== patchedCar.id ? c : patchedCar
            })}
            return state
        },
        showUserCar: (state, { payload }) => {
            state.user = {...state.user, cars: [...state.user.cars, payload]}
            return state
        }
    },
    extraReducers: {
    [fetchUser.fulfilled]: (state, { payload }) => {
        state.user = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      },
    [fetchUser.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      },
    [fetchUser.pending]: (state) => {
        state.isFetching = true;
      },  
    [logoutUser.fulfilled]: (state) => {
        state.user = null;
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        return state;
        },
    [postKid.fulfilled]: (state, { payload }) => {
        state.user = {...state.user, kids: [...state.user.kids, payload]};
        state.isFetching = false;
        state.isSuccess = true;
        return state;
        },
    [removeKid.fulfilled]: (state, { payload }) => {
        const filteredKids = state.user.kids.filter((kid) => kid.id !== payload)
        state.user.kids = filteredKids
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        return state;
        },
    [updateKid.fulfilled]: (state, { payload }) => {
        let patchedKid = state.user.kids.filter((kid) => kid.id == payload.id)[0]
        patchedKid = {...patchedKid, name: payload.name, school: payload.school, dimissal_time: payload.dismissal_time}
        state.user = {...state.user, kids: state.user.kids.map((k) => {
            return k.id !== patchedKid.id ? k : patchedKid
        })}
        state.isFetching = false;
        state.isSuccess = true;
        return state;
        },
    }
})
  
export const { clearState, signupUser, loginUser, removeCar, updateUserCar, showUserCar } = usersSlice.actions;
export const userSelector = state => state.users