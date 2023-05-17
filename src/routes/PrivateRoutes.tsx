import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'

interface Props {
    children: ReactNode
}

export const AdminRoute = ({ children }: Props) => {
    const { access } = useSelector(selectAccessUser)

    if (access.actualAccess === access.admin) {
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
