import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export interface CounterState {
    mode: string
}

const persistConfig = {
    key: 'theme',
    storage,
}

const initialState: CounterState = {
    mode: 'light',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeToggler: (state, action: PayloadAction<string>) => {
            state.mode = action.payload
        },
    },
})

export const persistedThemeReducer = persistReducer(
    persistConfig,
    themeSlice.reducer
)

export const { themeToggler } = themeSlice.actions
