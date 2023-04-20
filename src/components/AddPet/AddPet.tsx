import { useDispatch } from 'react-redux'
import MultilineTextFields from './Input'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, collection } from 'firebase/firestore'
import { storage, db } from '../../firebase/firebaseConfig'
import {
    useForm,
    SubmitHandler,
    SubmitErrorHandler,
    FieldErrors,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaAddPet } from 'helpers/validation/schema'
// import { useSnackbar } from 'notistack'
import { AppDispatch } from 'redux/store'
import { getData } from 'redux/getDataSlice/getData.service'
import { useState } from 'react'

export type Inputs = {
    name: string
    age: number
    description: string
    photo: string
    sex: string
}

export const AddPet = () => {
    const dispatch = useDispatch<AppDispatch>()
    const id = Date.now()
    const storageRef = ref(storage, `photos/${id}`)
    const [submittedCat, setSubmittedCat] = useState<boolean>(false)
    const [errors, setErrors] = useState<Partial<Inputs>>({})

    const { register, handleSubmit, setValue, reset } = useForm<Inputs>({
        resolver: yupResolver(schemaAddPet),
    })

    // const { enqueueSnackbar } = useSnackbar()

    const onSubmit: SubmitHandler<Inputs> = ({
        name,
        age,
        description,
        photo,
        sex,
    }) => {
        setErrors({})
        const file = new File([photo[0]], 'photo', { type: 'image/jpeg' })

        if (file !== null) {
            uploadBytes(storageRef, file).then((snapshot) => {
                if (snapshot) {
                    getDownloadURL(ref(storage, `photos/${id}`)).then((url) => {
                        if (url) {
                            setSubmittedCat(true)
                            onSubmitCat(name, age, description, url, sex)
                            dispatch(getData('cats'))
                            reset()
                            setTimeout(() => {
                                setSubmittedCat(false)
                            }, 1000)
                        }
                    })
                }
            })
        }
    }
    const onError: SubmitErrorHandler<Inputs> = (data) => {
        const fields: Readonly<string[]> = [
            'name',
            'age',
            'description',
            'photo',
            'sex',
        ]
        setErrors({})
        fields.map((item: string) => {
            if (
                data?.[item as keyof FieldErrors<Inputs>]?.message === undefined
            ) {
                return null
            }

            setErrors((prevState) => ({
                ...prevState,
                [item]: data?.[item as keyof FieldErrors<Inputs>]?.message,
            }))

            return null
            // return enqueueSnackbar(
            //     `${data?.[item as keyof FieldErrors<Inputs>]?.message}`,
            //     {
            //         variant: 'error',
            //     }
            // )
        })
    }

    const onSubmitCat = async (
        name: string,
        age: number | null,
        description: string,
        photoUrl: string,
        sex: string
    ) => {
        try {
            const petsRef = doc(collection(db, 'cats'))
            const petId = petsRef.id
            const petData = { petId, name, age, description, photoUrl, sex }

            await setDoc(petsRef, petData)
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    return (
        <>
            <MultilineTextFields
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                onError={onError}
                setValue={setValue}
                submittedCat={submittedCat}
                errors={errors}
            />
        </>
    )
}
