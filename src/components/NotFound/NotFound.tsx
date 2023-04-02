import { Box } from '@mui/material'
import Image from 'images/404.png'
import Container from '@mui/material/Container'

export const NotFound = () => {
    return (
        <Container
            maxWidth="xl"
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Box
                sx={(theme) => ({
                    maxWidth: '1000px',
                    height: 'auto',
                    [theme.breakpoints.down('xl')]: {
                        width: '100%',
                    },
                })}
                component={'img'}
                src={Image}
                alt={'404 Not Found Cat'}
            ></Box>
        </Container>
    )
}
