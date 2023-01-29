import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk('user/signup', async (user) => {
    const userSignup = await fetch('/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    const response = await userSignup.json()
    return response
})

export const loginUser = createAsyncThunk('user/login', async (user) => {
    const userLogin = await fetch('login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    const data = await userLogin.json()
    console.log(data)
    return data
})

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
        return user
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
        if (newKid.ok) {
            return data
        } else {
            return data.errors
        }
    })


export const removeKid = createAsyncThunk('user/removeKid', async (id) => {
    const kid = await fetch(`/kids/${id}`, { method: "DELETE" })
    return id;
})

export const updateKid = createAsyncThunk('user/updateKid', async (updatedKid) => {
    console.log(updatedKid)
    const theKid = await fetch(`/kids/${updatedKid.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedKid)
          })
          return theKid.json()
})

// export const updateSumDonations = createAsyncThunk('user/updateSumDonations', async (recipientId) => {
//     const recipient = await fetch(`/recipients/${recipientId}`)
//     console.log("recipient", recipient)
//     return recipient.json()
// })

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: { kids: [], cars: [] },
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
        [signupUser.fulfilled]: (state, { payload }) => {
          state.isFetching = false;
          state.isSuccess = true;
          state.user = payload
      },
      [signupUser.pending]: (state) => {
          state.isFetching = true;
      },
      [signupUser.rejected]: (state, { payload }) => {
          state.isFetching = false;
          state.isError = true;
          state.errorMessage = payload;
      },
      [loginUser.fulfilled]: (state, { payload }) => {
          state.user = payload;
          state.isFetching = false;
          state.isSuccess = true;
          state.isError = false;
          console.log("login fulfilled", state)
          return state;
      },
      [loginUser.rejected]: (state) => {
          state.isFetching = false;
          state.isError = true;
          state.errorMessage = "Invalid username or password";
      },
      [loginUser.pending]: (state) => {
          state.isFetching = true;
      }, 
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
        console.log("logged out!")
        return state;
        },
    [postKid.fulfilled]: (state, { payload }) => {
        console.log(payload)
        console.log(state.kids)
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
        console.log("in the reducer", payload)
        return state;
        },
    }
})





    
      
    

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
  
  export const { clearState } = usersSlice.actions;
  export const userSelector = state => state.users