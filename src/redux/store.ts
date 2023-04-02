import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { themeSlice } from './themeSlice/themeSlice'
import { authSlice } from './authSlice/authSlice'
import { getDataSlice } from './getDataSlice/getDataSlice'

const rootReducer = combineReducers({
    [themeSlice.name]: themeSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [getDataSlice.name]: getDataSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
