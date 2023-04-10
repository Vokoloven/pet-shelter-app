import MultilineTextFields from './Input'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { storage, db } from '../../firebase/firebaseConfig'
import {
    useForm,
    SubmitHandler,
    SubmitErrorHandler,
    FieldErrors,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaAddPet } from 'helpers/validation/schema'
import { useSnackbar } from 'notistack'
import nextId from 'react-id-generator'

export type Inputs = {
    name: string
    age: number
    description: string
    photo: string
    sex: string
}

export const AddPet = () => {
    const randomId = nextId()
    const storageRef = ref(storage, `photos/${randomId}`)

    const { register, handleSubmit, setValue } = useForm<Inputs>({
        resolver: yupResolver(schemaAddPet),
    })

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit: SubmitHandler<Inputs> = ({
        name,
        age,
        description,
        photo,
        sex,
    }) => {
        const file = new File([photo[0]], 'photo', { type: 'image/jpeg' })

        if (file !== null) {
            uploadBytes(storageRef, file).then((snapshot) => {
                if (snapshot) {
                    getDownloadURL(ref(storage, `photos/${randomId}`)).then(
                        (url) => {
                            if (url) {
                                onSubmitCat(
                                    randomId,
                                    name,
                                    age,
                                    description,
                                    url,
                                    sex
                                )
                                enqueueSnackbar('Cat added :)', {
                                    variant: 'success',
                                })
                            }
                        }
                    )
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
        fields.map((item: string) => {
            if (
                data?.[item as keyof FieldErrors<Inputs>]?.message === undefined
            ) {
                return null
            }

            return enqueueSnackbar(
                `${data?.[item as keyof FieldErrors<Inputs>]?.message}`,
                {
                    variant: 'error',
                }
            )
        })
    }

    const onSubmitCat = async (
        randomId: string | null,
        name: string,
        age: number | null,
        description: string,
        photoUrl: string,
        sex: string
    ) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const catsRef = await setDoc(doc(db, 'cats', `${randomId}`), {
                id: randomId,
                name,
                age,
                description,
                photoUrl,
                sex,
            })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    return (
        <MultilineTextFields
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onError={onError}
            setValue={setValue}
        />
    )
}
