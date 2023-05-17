import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'
import { selectAuth } from 'redux/authSlice/selectAuth'

interface Props {
    children: ReactNode
}

export const AdminRoute = ({ children }: Props) => {
    const { access } = useSelector(selectAccessUser)

    if (access.actualAccess === access.admin && access.actualAccess !== null) {
        return <>{children}</>
    } else {
        return <Navigate to={'/'} replace={true} />
    }
}

export const ModeratorRoute = ({ children }: Props) => {
    const { access } = useSelector(selectAccessUser)

    if (access.actualAccess !== null) {
        return <>{children}</>
    } else {
        return <Navigate to={'/'} replace={true} />
    }
}

export const AuthorizedRoute = ({ children }: Props) => {
    const { loggedIn } = useSelector(selectAuth)

    if (loggedIn) {
        return <>{children}</>
    } else {
        return <Navigate to={'/'} replace={true} />
    }
}
