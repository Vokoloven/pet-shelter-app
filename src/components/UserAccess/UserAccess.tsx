import React, { useState } from 'react'
import {
    useForm,
    SubmitHandler,
    SubmitErrorHandler,
    FieldErrors,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import MultilineTextFields from './Input'
import { schemaUserAccess } from 'helpers/validation/schema'

export type Inputs = {
    email: string
    checkbox: string
}

export const UserAccess = () => {
    const [admin, setAdmin] = useState<boolean>(false)
    const [moderator, setModerator] = useState<boolean>(false)

    const { register, handleSubmit, setValue } = useForm<Inputs>({
        resolver: yupResolver(schemaUserAccess),
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    const onError: SubmitErrorHandler<Inputs> = (data) => {
        console.log(data)
    }

    const onHandleChange = (
        access: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (access === 'admin') {
            setAdmin(e.target.checked)
            setModerator(!e.target.checked)
            setValue('checkbox', 'admin')
        }
        if (access === 'moderator') {
            setModerator(e.target.checked)
            setAdmin(!e.target.checked)
            setValue('checkbox', 'moderator')
        }
    }

    return (
        <MultilineTextFields
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onError={onError}
            onHandleChange={onHandleChange}
            admin={admin}
            moderator={moderator}
        />
    )
}
