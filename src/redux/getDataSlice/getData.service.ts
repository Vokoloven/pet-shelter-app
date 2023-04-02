import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../firebase/firebaseConfig'
import { collection, getDocs, DocumentData } from 'firebase/firestore'

export const getData = createAsyncThunk(
    'cats/getData',
    async (ref: string, { rejectWithValue }) => {
        try {
            const catsRef = collection(db, `${ref}`)
            const querySnapshot = await getDocs(catsRef)
            const data: DocumentData[] = []

            if (querySnapshot.empty === true) {
                throw new Error('Data not found')
            }

            querySnapshot.forEach((doc) => {
                const docData = doc.data()
                if (docData) {
                    data.push(docData)
                }
            })

            return data
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err)
        }
    }
)
