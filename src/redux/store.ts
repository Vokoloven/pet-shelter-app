import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { themeSlice } from './themeSlice/themeSlice'
import { authSlice } from './authSlice/authSlice'
import { getDataSlice } from './getDataSlice/getDataSlice'
import { getFavoriteDataSlice } from './getDataFavoriteSlice/getDataFavoriteSlice'
import { accessUserSlice } from './accessSlice/accessSlice'
import { persistedAuthReducer } from './authSlice/authSlice'
import { persistedThemeReducer } from './themeSlice/themeSlice'

const rootReducer = combineReducers({
    [themeSlice.name]: persistedThemeReducer,
    [authSlice.name]: persistedAuthReducer,
    [getDataSlice.name]: getDataSlice.reducer,
    [accessUserSlice.name]: accessUserSlice.reducer,
    [getFavoriteDataSlice.name]: getFavoriteDataSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
