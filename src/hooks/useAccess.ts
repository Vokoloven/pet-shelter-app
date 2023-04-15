import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth } from 'redux/authSlice/selectAuth'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'
import {
    setAccess,
    setAdmin,
    setModerator,
} from 'redux/accessSlice/accessSlice'

type User = {
    email: string
    accessId: string
}

enum Access {
    ADMIN,
    MODERATOR,
}

export const useAccess = () => {
    const { accessUser } = useSelector(selectAccessUser)
    const {
        user: { email },
    } = useSelector(selectAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAdmin(Access.ADMIN))
        dispatch(setModerator(Access.MODERATOR))
        if (accessUser.length > 0) {
            const admin = accessUser[0]?.admin
            const moderator = accessUser[1]?.moderator

            const adminStatus = admin.some((item: User) => item.email === email)
            const moderatorStatus = moderator.some(
                (item: User) => item.email === email
            )

            if (adminStatus) {
                dispatch(setAccess(Access.ADMIN))
            } else if (moderatorStatus) {
                dispatch(setAccess(Access.MODERATOR))
            } else {
                setAccess(null)
            }
        }
    }, [accessUser, dispatch, email])
}
