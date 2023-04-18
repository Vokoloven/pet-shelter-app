import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export const getFavoriteData = createAsyncThunk(
    'favorite/getData',
    async (email: string | null, { rejectWithValue }) => {
        try {
            const favoriteRef = doc(db, 'favorites', `${email}`)
            const favoriteSnap = await getDoc(favoriteRef)
            if (favoriteSnap.exists()) {
                const { data } = favoriteSnap.data()
                return data
            } else {
                throw new Error('No such document!')
            }
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err)
        }
    }
)
