import Box from '@mui/material/Box'
import { HomeButtons } from './HomeButtons'
import { HomeImage } from './HomeImage'
import { HomeTypography } from './HomeTypography'

export function HomeBackground() {
    return (
        <Box>
            <HomeTypography />
            <HomeImage />
            <HomeButtons />
        </Box>
    )
}
