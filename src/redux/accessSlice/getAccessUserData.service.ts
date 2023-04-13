import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../firebase/firebaseConfig'
import { collection, getDocs, DocumentData } from 'firebase/firestore'

export const getAccessUserData = createAsyncThunk(
    'accessUser/getData',
    async (_, { rejectWithValue }) => {
        try {
            const accessAdminRef = collection(db, 'access')
            const querySnapshot = await getDocs(accessAdminRef)
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
