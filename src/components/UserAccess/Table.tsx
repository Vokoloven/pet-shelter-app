import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'
import { IconButton } from '@mui/material'
import { selectTheme } from 'redux/themeSlice/selectTheme'

type UserAccess = {
    email: string
    accessId: string
}

type Handler = {
    onClickHandler: (accessId: string, status: string) => void
}

export default function BasicTable({ onClickHandler }: Handler) {
    const { accessUser } = useSelector(selectAccessUser)
    const { mode } = useSelector(selectTheme)

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 5, maxWidth: 400 }}>
                <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Admin</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accessUser.length > 0 &&
                            accessUser[0]?.admin.map((item: UserAccess) => (
                                <TableRow
                                    key={item.email}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.email}
                                    </TableCell>
                                    <TableCell align="right">
                                        {
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() =>
                                                    onClickHandler(
                                                        item?.accessId,
                                                        'admin'
                                                    )
                                                }
                                                sx={{
                                                    color:
                                                        mode === 'light'
                                                            ? 'primary.main'
                                                            : 'secondary.main',
                                                }}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ mt: 3, maxWidth: 400 }}>
                <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Moderator</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accessUser.length > 0 &&
                            accessUser[1]?.moderator.map((item: UserAccess) => (
                                <TableRow
                                    key={item.email}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.email}
                                    </TableCell>
                                    <TableCell align="right">
                                        {
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() =>
                                                    onClickHandler(
                                                        item?.accessId,
                                                        'moderator'
                                                    )
                                                }
                                                sx={{
                                                    color:
                                                        mode === 'light'
                                                            ? 'primary.main'
                                                            : 'secondary.main',
                                                }}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
