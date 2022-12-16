import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { getMonth } from 'date-fns';

export interface Tag {
    id: number;
    value: string;
    username: string;
};

export interface Transaction {
    id: number;
    name: string;
    value: number;
    tags: string[];
    username: string;
    date: Date;
};

export interface Initial_State {
    logged_in: boolean;
    token: string;
    transactions: Transaction[];
    tags: Tag[];
    active_tag_name: string;
    active_month: string; // date string
    existing_transaction: Transaction;
};

const initial_state: Initial_State = {
    logged_in: null,
    token: null,
    transactions: [],
    tags: [],
    active_tag_name: null,
    active_month: new Date(new Date().getFullYear(), new Date().getMonth()).toISOString(), // first day of current month
    existing_transaction: null
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
        set_active_tag_name: (state, action) => {
            state.active_tag_name = action.payload;
        },
        set_existing_transaction: (state, action) => {
            state.existing_transaction = action.payload;
        }
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const reducer = combineReducers({
    default: default_slice.reducer
})


export const {
    set_logged_in,
    set_token,
    set_transactions,
    set_tags,
    set_active_tag_name,
    set_existing_transaction
} = default_slice.actions;

export default default_slice.reducer;

export const store = configureStore({ reducer: reducer});