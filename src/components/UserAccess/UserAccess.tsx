import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    useForm,
    SubmitHandler,
    SubmitErrorHandler,
    FieldErrors,
} from 'react-hook-form'
import { Box } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import MultilineTextFields from './Input'
import { schemaUserAccess } from 'helpers/validation/schema'
import { doc, updateDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { CircleLoader } from 'react-spinners'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'
import { getAccessUserData } from 'redux/accessSlice/getAccessUserData.service'
import { AppDispatch } from 'redux/store'
import BasicTable from './Table'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { deepOrange, orange } from '@mui/material/colors'

export type Inputs = {
    email: string
    checkbox: string
}

type UserData = {
    email: string
    accessId: string
}

export const UserAccess = () => {
    const [admin, setAdmin] = useState<boolean>(false)
    const [moderator, setModerator] = useState<boolean>(false)
    const [status, setStatus] = useState<string | null>(null)
    const [data, setData] = useState<string[] | null>(null)
    const { accessUser, loading } = useSelector(selectAccessUser)
    const { mode } = useSelector(selectTheme)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch<AppDispatch>()

    const { register, handleSubmit, setValue } = useForm<Inputs>({
        resolver: yupResolver(schemaUserAccess),
    })

    useEffect(() => {
        if (status === 'admin' && accessUser.length > 0) {
            setData(accessUser[0]?.admin)
        }
        if (status === 'moderator' && accessUser.length > 0) {
            setData(accessUser[1]?.moderator)
        }
    }, [accessUser, status])

    const setUserAccess = async (email: string, checkbox: string) => {
        const customRef = doc(collection(db, 'access'))
        const accessId = customRef.id
        const accessRef = doc(db, 'access', `${checkbox}`)

        if (data !== null) {
            const duplicateEmails = data.some(
                (item: any) => item.email === email
            )
            if (duplicateEmails) {
                enqueueSnackbar(`${email} already added`, {
                    variant: 'warning',
                })
                return
            }

            await updateDoc(accessRef, {
                [checkbox]: [...data, { email, accessId }],
            })
            dispatch(getAccessUserData())
        }
    }

    const onSubmit: SubmitHandler<Inputs> = ({ email, checkbox }) => {
        setUserAccess(email, checkbox)
    }

    const onError: SubmitErrorHandler<Inputs> = (data) => {
        const fields: Readonly<string[]> = ['email', 'checkbox']

        fields.map((item: string) => {
            if (
                data?.[item as keyof FieldErrors<Inputs>]?.message === undefined
            ) {
                return null
            } else {
                return enqueueSnackbar(
                    `${data?.[item as keyof FieldErrors<Inputs>]?.message}`,
                    { variant: 'error' }
                )
            }
        })
    }

    const onHandleChange = (
        access: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (access === 'admin') {
            setAdmin(e.target.checked)
            setModerator(!e.target.checked)
            setValue('checkbox', 'admin')
            setStatus('admin')
        }
        if (access === 'moderator') {
            setModerator(e.target.checked)
            setAdmin(!e.target.checked)
            setValue('checkbox', 'moderator')
            setStatus('moderator')
        }
    }

    const onClickHandler = async (accessId: string, status: string) => {
        if (status === 'admin') {
            const filteredAdmins = accessUser[0]?.admin.filter(
                (item: UserData) => item.accessId !== accessId
            )
            const accessAdmin = doc(db, 'access', 'admin')
            await updateDoc(accessAdmin, {
                admin: filteredAdmins,
            })
            dispatch(getAccessUserData())
        }
        if (status === 'moderator') {
            const filteredModerators = accessUser[1]?.moderator.filter(
                (item: UserData) => item.accessId !== accessId
            )
            const accessModerator = doc(db, 'access', 'moderator')
            await updateDoc(accessModerator, {
                moderator: filteredModerators,
            })
            dispatch(getAccessUserData())
        }
    }

    return (
        <>
            {loading === 'pending' && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    <CircleLoader
                        color={mode === 'light' ? orange[500] : deepOrange[500]}
                    />
                </Box>
            )}
            {loading === 'succeeded' && (
                <Box>
                    <MultilineTextFields
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        onError={onError}
                        onHandleChange={onHandleChange}
                        admin={admin}
                        moderator={moderator}
                    />
                    <BasicTable onClickHandler={onClickHandler} />
                </Box>
            )}
        </>
    )
}
