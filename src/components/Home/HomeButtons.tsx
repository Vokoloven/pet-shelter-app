import { BasicModal } from './HomeModal'
import { Button } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'

export const HomeButtons = () => {
    const { mode } = useSelector(selectTheme)
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '400px',
                transform: 'translate(100%, 2000%)',
                [theme.breakpoints.down('lg')]: {
                    transform: 'translate(50%, 2000%)',
                },
                [theme.breakpoints.down('md')]: {
                    transform: 'translate(80%, 1400%)',
                    width: '300px',
                },
                [theme.breakpoints.down('sm')]: {
                    transform: 'translate(100%, 500%)',
                    width: '150px',
                    flexDirection: 'column',
                },
            })}
        >
            <NavLink to={'/about'}>
                <Button
                    variant="contained"
                    sx={{
                        '&:hover': {
                            backgroundColor:
                                mode === 'dark'
                                    ? 'secondary.dark'
                                    : 'primary.dark',
                        },
                        backgroundColor:
                            mode === 'dark' ? 'secondary.main' : 'primary.main',
                    }}
                    endIcon={<SchoolIcon />}
                >
                    Learn more
                </Button>
            </NavLink>
            <BasicModal />
        </Box>
    )
}
