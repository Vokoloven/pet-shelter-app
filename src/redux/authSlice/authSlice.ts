import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    user: {}
    token: string
}

const initialState: AuthState = {
    user: {},
    token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUser: (state, action: PayloadAction<Partial<{}>>) => {
            state.user = action.payload
        },
        authToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
})

export const { authUser, authToken } = authSlice.actions
