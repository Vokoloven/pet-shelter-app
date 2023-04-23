import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { px2vw } from 'utils/responsiveWidth'

export const HomeTypography = () => {
    const { mode } = useSelector(selectTheme)

    return (
        <>
            <Typography
                variant="h1"
                component={'h1'}
                sx={(theme) => ({
                    position: 'absolute',
                    top: '5%',
                    left: '15%',
                    maxWidth: `${px2vw(800)}`,

                    fontSize: `${px2vw(75)}`,
                    fontWeight: 'bold',

                    color:
                        mode === 'dark'
                            ? 'secondary.main'
                            : 'secondary.contrastText',
                    [theme.breakpoints.down('lg')]: {
                        left: '20%',
                    },
                    [theme.breakpoints.down('md')]: {
                        left: '25%',
                    },
                    [theme.breakpoints.down('sm')]: {
                        left: '40%',
                        fontSize: `${px2vw(35, 600)}`,
                    },
                })}
            >
                Hi! You are welcome on Cats Shelter Homepage
            </Typography>
            <Typography
                variant="body1"
                component={'h2'}
                sx={(theme) => ({
                    position: 'absolute',
                    top: '40%',
                    left: '25%',
                    maxWidth: `${px2vw(700)}`,
                    fontSize: `${px2vw(35)}`,
                    fontWeight: 'bold',
                    color:
                        mode === 'dark'
                            ? 'secondary.main'
                            : 'secondary.contrastText',
                    [theme.breakpoints.down('lg')]: {
                        left: '30%',
                        top: '30%',
                        fontSize: `${px2vw(35, 1000)}`,
                    },
                    [theme.breakpoints.down('md')]: {
                        left: '45%',
                        fontSize: `${px2vw(35, 900)}`,
                    },
                    [theme.breakpoints.down('sm')]: {
                        top: '20%',
                        left: '45%',
                        fontSize: `${px2vw(25, 600)}`,
                    },
                })}
            >
                We are a small organization that helps homeless animals find a
                home.
            </Typography>
        </>
    )
}
