import { BasicModal } from './HomeModal'
import { Button } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { px2vw } from 'utils/responsiveWidth'

export const HomeButtons = () => {
    const { mode } = useSelector(selectTheme)
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                top: '70%',
                left: '35%',
                width: `${px2vw(300)}`,
                [theme.breakpoints.down('lg')]: {
                    width: `${px2vw(400, 1300)}`,
                },
                [theme.breakpoints.down('md')]: {
                    width: `${px2vw(400, 900)}`,
                    top: '65%',
                    left: '25%',
                },
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                    top: '45%',
                    left: '55%',
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
