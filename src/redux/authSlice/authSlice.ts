import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export interface IAuthState {
    user: Pick<User, 'uid' | 'displayName' | 'photoURL' | 'email'>
    token: string
    loggedIn: boolean
}

const persistConfig = {
    key: 'auth',
    storage,
}

const initialState: IAuthState = {
    user: {
        uid: '',
        displayName: '',
        photoURL: '',
        email: '',
    },
    token: '',
    loggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUser: (state, action: PayloadAction<User>) => {
            state.loggedIn = true
            state.user.uid = action.payload.uid
            state.user.displayName = action.payload.displayName
            state.user.photoURL = action.payload.photoURL
            state.user.email = action.payload.email
        },
        authToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logOutUser: (state) => {
            state.loggedIn = false
            state.user.uid = ''
            state.user.displayName = ''
            state.user.photoURL = ''
            state.user.email = ''
            state.token = ''
        },
    },
})

export const persistedAuthReducer = persistReducer(
    persistConfig,
    authSlice.reducer
)

export const { authUser, authToken, logOutUser } = authSlice.actions
