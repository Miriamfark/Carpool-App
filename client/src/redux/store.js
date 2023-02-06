import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./usersSlice";
import { carsSlice } from "./carsSlice";
import { carpoolsSlice } from "./carpoolsSlice";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    cars: carsSlice.reducer,
    carpools: carpoolsSlice.reducer
  },
});

export default store;