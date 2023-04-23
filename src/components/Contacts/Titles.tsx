import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { Box, Typography } from '@mui/material'
import { px2vw } from 'utils/responsiveWidth'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'

type Props = {
    title: string
    icon: string
}

export const Titles = ({ title, icon }: Props) => {
    const { mode } = useSelector(selectTheme)

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
                component={'h2'}
                sx={(theme) => ({
                    fontWeight: 700,
                    fontSize: px2vw(40),
                    color: mode === 'light' ? 'primary.main' : 'secondary.main',
                    [theme.breakpoints.down('xl')]: {
                        fontSize: px2vw(40, 1300),
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: px2vw(30, 800),
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: px2vw(30, 500),
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: px2vw(30, 500),
                    },
                })}
            >
                {title}
            </Typography>
            {icon === 'contacts' && (
                <ContactPhoneIcon
                    sx={(theme) => ({
                        ml: 1,
                        fontSize: px2vw(30),
                        color:
                            mode === 'light'
                                ? 'primary.main'
                                : 'secondary.main',
                        [theme.breakpoints.down('xl')]: {
                            fontSize: px2vw(30, 1300),
                        },
                        [theme.breakpoints.down('lg')]: {
                            fontSize: px2vw(30, 900),
                        },
                        [theme.breakpoints.down('md')]: {
                            fontSize: px2vw(30, 600),
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: px2vw(40, 600),
                        },
                    })}
                />
            )}
            {icon === 'social' && (
                <ConnectWithoutContactIcon
                    sx={(theme) => ({
                        ml: 1,
                        fontSize: px2vw(30),
                        color:
                            mode === 'light'
                                ? 'primary.main'
                                : 'secondary.main',
                        [theme.breakpoints.down('xl')]: {
                            fontSize: px2vw(30, 1300),
                        },
                        [theme.breakpoints.down('lg')]: {
                            fontSize: px2vw(30, 900),
                        },
                        [theme.breakpoints.down('md')]: {
                            fontSize: px2vw(30, 600),
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: px2vw(40, 600),
                        },
                    })}
                />
            )}
            {icon === 'location' && (
                <LocationOnIcon
                    sx={(theme) => ({
                        ml: 1,
                        fontSize: px2vw(30),
                        color:
                            mode === 'light'
                                ? 'primary.main'
                                : 'secondary.main',
                        [theme.breakpoints.down('xl')]: {
                            fontSize: px2vw(30, 1300),
                        },
                        [theme.breakpoints.down('lg')]: {
                            fontSize: px2vw(30, 900),
                        },
                        [theme.breakpoints.down('md')]: {
                            fontSize: px2vw(30, 600),
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: px2vw(40, 600),
                        },
                    })}
                />
            )}
        </Box>
    )
}
