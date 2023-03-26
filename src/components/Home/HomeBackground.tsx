import { HomeButtons } from './HomeButtons'
import { HomeImage } from './HomeImage'
import { HomeTypography } from './HomeTypography'
import { Box } from '@mui/system'

export function HomeBackground() {
    return (
        <Box sx={{ position: 'relative' }}>
            <HomeTypography />
            <HomeImage />
            <HomeButtons />
        </Box>
    )
}
