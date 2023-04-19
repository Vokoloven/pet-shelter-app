import { createSlice } from '@reduxjs/toolkit'
import { DocumentData } from 'firebase/firestore'
import { getData } from './getData.service'

interface ICatsData {
    data: DocumentData[]
    favoriteData: DocumentData[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    data: [],
    favoriteData: [],
    loading: 'idle',
} as ICatsData

export const getDataSlice = createSlice({
    name: 'catsData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getData.fulfilled, (state, { payload }) => {
            state.loading = 'succeeded'
            state.data = [...payload]
        })
        builder.addCase(getData.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})
