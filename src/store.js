import { combineReducers, configureStore, createReducer, createSlice } from '@reduxjs/toolkit'

const default_slice = createSlice({
    name: 'slice',
    initialState: {
        logged_in: null,
        // balance: 0,
        token: null,
        transactions: [],
    },
    reducers: {
        // set_balance: (state, action) => {
        //     state.balance = action.payload;
        // },
        set_logged_in: (state, action) => {
            state.logged_in = action.payload;
        },
        set_token: (state, action) => {
            state.token = action.payload;
        },
        // set_categories: (state, action) => {
        //     state.categories = action.payload;
        // },
        set_transactions: (state, action) => {
            state.transactions = action.payload;
        },
        // set_accounts: (state, action) => {
        //     state.accounts = action.payload;
        // },
        // set_username: (state, action) => {
        //     state.username = action.payload;
        // },

        // set_food_items_today: (state, action) => {
        //     state.food_items_today = action.payload;
        // }
    }
});

const reducer = combineReducers({
    default: default_slice.reducer
})

export const {
    // set_balance,
    set_logged_in,
    set_token,
    // set_categories,
    set_transactions,
    // set_accounts,
} = default_slice.actions;

export default default_slice.reducer;

export const store = configureStore({ reducer: reducer});