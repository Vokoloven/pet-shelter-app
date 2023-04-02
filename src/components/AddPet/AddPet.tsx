import React from 'react'
import MultilineTextFields from './Input'
import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { storage, db } from '../../firebase/firebaseConfig'

export const AddPet = () => {
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [photoUrl, setPhotoUrl] = useState<string | null>(null)

    const randomId = Date.now()
    const storageRef = ref(storage, `photos/${randomId}`)

    const onChangeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let data = e.target as HTMLInputElement
        const { id } = data
        const { value } = data

        switch (id) {
            case 'name':
                setName(value)
                break
            case 'age':
                setAge(value)
                break
            case 'description':
                setDescription(value)
                break
            default:
                return
        }
    }

    const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = e.target as HTMLInputElement
        const { files } = data
        if (files) {
            const data = files[0]

            const file = new File([data], 'photos', { type: 'image/jpg' })

            if (file !== null) {
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log(snapshot, 'Uploaded a blob or file!')
                    getPhotoUrl()
                })
            }
        }
    }

    const getPhotoUrl = () => {
        getDownloadURL(ref(storage, `photos/${randomId}`)).then((url) => {
            if (url) {
                setPhotoUrl(url)
            }
        })
    }

    const onSubmitPhotoHandler = async () => {
        try {
            const catsRef = await setDoc(doc(db, 'cats', `${randomId}`), {
                id: randomId,
                name,
                age,
                description,
                photoUrl,
            })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    return (
        <MultilineTextFields
            onChangeHandler={onChangeHandler}
            onChangeFileHandler={onChangeFileHandler}
            onSubmitPhotoHandler={onSubmitPhotoHandler}
            age={age}
            name={name}
            description={description}
        />
    )
}
