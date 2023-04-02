import * as yup from 'yup'
import regExp from './regExp'
import { DocumentData } from 'firebase/firestore'

export const schemaAddPet = yup.object().shape({
    name: yup
        .string()
        .matches(regExp.nameRegExp, 'Please fill the name field')
        .min(2)
        .max(16),
    age: yup.number().required().positive().integer(),
    description: yup
        .string()
        .matches(regExp.descriptionRexExp, 'Please fill the description field')
        .min(8)
        .max(120)
        .required(),
    photo: yup
        .mixed()
        .required()
        .test('name', 'You should provide the file', (value: DocumentData) => {
            if (value?.length === 0) {
                return false
            } else {
                return true
            }
        })
        .test(
            'size',
            'The file size should be no more than 5Mb',
            (value: DocumentData) => {
                if (value?.length === 0) {
                    return false
                }

                return value && value[0].size <= 5000000
            }
        )
        .test('type', 'We only support jpeg or png', (value: DocumentData) => {
            if (!value) {
                return
            }
            if (value?.length === 0) {
                return false
            }
            return (
                (value && value[0].type === 'image/jpeg') ||
                value[0].type === 'image/png'
            )
        }),
})
