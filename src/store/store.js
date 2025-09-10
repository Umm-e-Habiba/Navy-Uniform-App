import { configureStore } from "@reduxjs/toolkit";
import dressesSlice from "./DressesSlice/dressesSlice";

export default configureStore({
    reducer: {
        dresses: dressesSlice,
    },
});
