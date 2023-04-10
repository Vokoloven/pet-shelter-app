import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    status: number
}

export const PrivateRoute = ({ children, status }: Props) => {
    if (status === 0) {
        return <>{children}</>
    } else {
        return null
    }
}
