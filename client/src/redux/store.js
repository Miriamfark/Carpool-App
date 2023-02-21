import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./usersSlice";
import { carsSlice } from "./carsSlice";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    cars: carsSlice.reducer,
  },
});

export default store;