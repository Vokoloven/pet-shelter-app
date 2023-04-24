import { Box } from '@mui/system'
import MasonryImageList from './MasonryImageList'
import { Titles } from './Titles'

export const About = () => {
    return (
        <Box sx={{ pb: 3 }}>
            <Titles />
            <MasonryImageList />
        </Box>
    )
}
