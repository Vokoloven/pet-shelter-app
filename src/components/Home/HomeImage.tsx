import LeftCorner from 'images/leftCorner.png'
import MainBg from 'images/mainBg.png'
import Box from '@mui/material/Box'

export const HomeImage = () => {
    return (
        <Box>
            <Box
                style={{
                    backgroundImage: `url(${LeftCorner})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    // backgroundPosition: 'left',
                }}
                sx={(theme) => ({
                    height: 'calc(100vh - 78px)',
                    width: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    [theme.breakpoints.down('sm')]: {
                        height: 'calc(100vh - 64px)',
                    },
                })}
            />
            <Box
                style={{
                    backgroundImage: `url(${MainBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'bottom',
                }}
                sx={(theme) => ({
                    height: 'calc(100vh - 78px)',
                    width: '25vw',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    [theme.breakpoints.down('sm')]: {
                        height: 'calc(100vh - 64px)',
                    },
                })}
            />
        </Box>
    )
}
