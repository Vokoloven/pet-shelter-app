import { Box } from '@mui/material'
import Image from 'images/404.png'
import Container from '@mui/material/Container'

export const NotFound = () => {
    return (
        <Container maxWidth="xl">
            <Box
                sx={{ width: '100%', height: 'auto' }}
                component={'img'}
                src={Image}
                alt={'404 Not Found Cat'}
            ></Box>
        </Container>
    )
}
