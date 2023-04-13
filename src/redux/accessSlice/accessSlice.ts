import { createSlice } from '@reduxjs/toolkit'
import { DocumentData } from 'firebase/firestore'
import { getAccessUserData } from './getAccessUserData.service'

interface IAccessUser {
    accessUser: DocumentData[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: IAccessUser = {
    accessUser: [],
    loading: 'idle',
}

export const accessUserSlice = createSlice({
    name: 'accessUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAccessUserData.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getAccessUserData.fulfilled, (state, { payload }) => {
            state.loading = 'succeeded'
            state.accessUser = payload
        })
        builder.addCase(getAccessUserData.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})
