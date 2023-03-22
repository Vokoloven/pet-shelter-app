import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    mode: string
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

export const { themeToggler } = themeSlice.actions
