import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
    children: ReactNode
    status: number | null
}

enum Access {
    ADMIN,
    MODERATOR,
}

export const AdminRoute = ({ children, status }: Props) => {
    if (status === Access.ADMIN) {
        return <>{children}</>
    } else {
        return <Navigate to={'/'} replace={true} />
    }
}

export const ModeratorRoute = ({ children, status }: Props) => {
    if (status === Access.MODERATOR || status === Access.ADMIN) {
        return <>{children}</>
    } else {
        return <Navigate to={'/'} replace={true} />
    }
}
