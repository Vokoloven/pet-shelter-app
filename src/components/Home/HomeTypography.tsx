import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'

export const HomeTypography = () => {
    const { mode } = useSelector(selectTheme)

    return (
        <>
            <Typography
                variant="h1"
                component={'h1'}
                sx={(theme) => ({
                    fontWeight: 'bold',
                    fontSize: '100px',
                    maxWidth: '800px',
                    position: 'absolute',
                    transform: 'translate(50%, 50%)',
                    top: 0,
                    left: 0,
                    color:
                        mode === 'dark'
                            ? 'secondary.main'
                            : 'secondary.contrastText',
                    [theme.breakpoints.down('lg')]: {
                        fontSize: '80px',
                        maxWidth: '500px',
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: '50px',
                        maxWidth: '400px',
                    },
                    [theme.breakpoints.down('sm')]: {
                        top: -50,
                        left: 20,
                        fontSize: '35px',
                        maxWidth: '200px',
                    },
                })}
            >
                Hi! You are welcome on Cats Shelter Website
            </Typography>
            <Typography
                variant="body1"
                component={'h2'}
                sx={(theme) => ({
                    fontWeight: 'bold',
                    fontSize: '25px',
                    maxWidth: '700px',
                    position: 'absolute',
                    transform: 'translate(50%, 800%)',
                    top: 0,
                    left: 0,
                    color:
                        mode === 'dark'
                            ? 'secondary.main'
                            : 'secondary.contrastText',
                    [theme.breakpoints.down('lg')]: {
                        fontSize: '25px',
                        maxWidth: '500px',
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: '25px',
                        maxWidth: '350px',
                        top: -600,
                        left: 50,
                    },
                    [theme.breakpoints.down('sm')]: {
                        top: -1000,
                        left: 60,
                        fontSize: '20px',
                        maxWidth: '180px',
                    },
                })}
            >
                We are a small organization that helps homeless animals find a
                home.
            </Typography>
        </>
    )
}
