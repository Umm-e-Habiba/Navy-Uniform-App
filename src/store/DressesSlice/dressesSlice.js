import { createSlice } from "@reduxjs/toolkit";

const dressesSlice = createSlice({
    name: "dresses",
    initialState: {
        allDresses: [],
        maleDresses: [],
        femaleDresses: [],
        currentDresses: {},
        defaultState: false,
    },

    reducers: {
        setAllDressStates: (state, action) => {
            state = action.payload;
            return state;
        },
        setCurrentDresses: (state, action) => {
            state.currentDresses = action.payload;
            return state;
        },
        setDefaultState: (state, action) => {
            state.defaultState = action.payload;
            return state;
        },
    },
});
export const { addDresses, setCurrentDresses, setAllDressStates, setDefaultState } =
    dressesSlice.actions;
export const getAllDresses = (state) => state.dresses.allDresses;

export default dressesSlice.reducer;
