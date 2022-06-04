import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'

export interface Transaction {
    id: number;
    name: string;
    value: number;
    tags: string[];
}

export interface Initial_State {
    logged_in: boolean;
    token: string;
    transactions: Transaction[];
    tags: string[];
}

const initial_state: Initial_State = {
    logged_in: null,
    token: null,
    transactions: [],
    tags: []
};

const default_slice = createSlice({
    name: 'slice',
    initialState: initial_state,
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
        set_tags: (state, action) => {
            state.tags = action.payload;
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const reducer = combineReducers({
    default: default_slice.reducer
})


export const {
    // set_balance,
    set_logged_in,
    set_token,
    // set_categories,
    set_transactions,
    set_tags
    // set_accounts,
} = default_slice.actions;

export default default_slice.reducer;

export const store = configureStore({ reducer: reducer});