import LeftCorner from 'images/leftCorner.png'
import MainBg from 'images/mainBg.png'
import Box from '@mui/material/Box'

export const HomeImage = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={(theme) => ({
                    backgroundImage: `url(${LeftCorner})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left top',
                    height: 'calc(100vh - 85px)',
                    width: '100%',
                    [theme.breakpoints.down('md')]: {
                        height: 'calc(100vh - 85px)',
                        backgroundSize: 'contain',
                    },
                    [theme.breakpoints.down('sm')]: {
                        height: `calc(100vh - 85px)`,
                        backgroundSize: 'cover',
                    },
                })}
            />
            <Box
                sx={(theme) => ({
                    backgroundImage: `url(${MainBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right bottom',
                    height: 'calc(100vh - 85px)',
                    width: '50vw',
                    [theme.breakpoints.down('sm')]: {
                        height: `calc(100vh - 85px)`,
                    },
                })}
            />
        </Box>
    )
}
