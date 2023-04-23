import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { Typography } from '@mui/material'
import { px2vw } from 'utils/responsiveWidth'
import { Box } from '@mui/system'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import TelegramIcon from '@mui/icons-material/Telegram'

type Props = {
    contactNumber: string
}

export const Person = ({ contactNumber }: Props) => {
    const { mode } = useSelector(selectTheme)

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
                component={'h2'}
                sx={(theme) => ({
                    fontWeight: 700,
                    fontSize: px2vw(20),
                    color: mode === 'light' ? 'primary.main' : 'secondary.main',
                    [theme.breakpoints.down('xl')]: {
                        fontSize: px2vw(20, 1300),
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: px2vw(20, 800),
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: px2vw(20, 500),
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: px2vw(20, 500),
                    },
                })}
            >
                {contactNumber}
            </Typography>
            <PhoneIphoneIcon
                sx={(theme) => ({
                    ml: 1,
                    fontSize: px2vw(30),
                    color: mode === 'light' ? 'primary.main' : 'secondary.main',
                    [theme.breakpoints.down('xl')]: {
                        fontSize: px2vw(20, 1300),
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: px2vw(20, 900),
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: px2vw(20, 600),
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: px2vw(30, 600),
                    },
                })}
            />
            <TelegramIcon
                sx={(theme) => ({
                    fontSize: px2vw(30),
                    color: mode === 'light' ? 'primary.main' : 'secondary.main',
                    [theme.breakpoints.down('xl')]: {
                        fontSize: px2vw(20, 1300),
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: px2vw(20, 900),
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: px2vw(20, 600),
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: px2vw(30, 600),
                    },
                })}
            />
        </Box>
    )
}
