import { createSlice } from '@reduxjs/toolkit'
import { getFavoriteData } from './getFavoriteData.service'
import { DocumentData } from 'firebase/firestore'

interface IFavoriteData {
    favoriteData: DocumentData
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    favoriteData: [],
    loading: 'idle',
} as IFavoriteData

export const getFavoriteDataSlice = createSlice({
    name: 'favoriteData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFavoriteData.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getFavoriteData.fulfilled, (state, { payload }) => {
            state.loading = 'succeeded'
            state.favoriteData = [...payload]
        })
        builder.addCase(getFavoriteData.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})
