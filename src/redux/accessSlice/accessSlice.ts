import { createSlice } from '@reduxjs/toolkit'
import { DocumentData } from 'firebase/firestore'
import { getAccessUserData } from './getAccessUserData.service'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AccessType } from 'types/globalTypes'

interface IAccessUser {
    accessUser: DocumentData[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    access: AccessType
}

const initialState: IAccessUser = {
    accessUser: [],
    loading: 'idle',
    access: {
        actualAccess: null,
        admin: null,
        moderator: null,
    },
}

export const accessUserSlice = createSlice({
    name: 'accessUser',
    initialState,
    reducers: {
        setAccess: (state, action: PayloadAction<number | null>) => {
            state.access.actualAccess = action.payload
        },
        setAdmin: (state, action: PayloadAction<number | null>) => {
            state.access.admin = action.payload
        },
        setModerator: (state, action: PayloadAction<number | null>) => {
            state.access.moderator = action.payload
        },
    },
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

export const { setAccess, setAdmin, setModerator } = accessUserSlice.actions
