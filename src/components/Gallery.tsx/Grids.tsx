import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import RecipeReviewCard from './Card'
import { selectData } from 'redux/getDataSlice/selectData'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import CircularProgress from '@mui/material/CircularProgress'

export default function ResponsiveGrid() {
    const { data, loading } = useSelector(selectData)
    const { mode } = useSelector(selectTheme)

    return (
        <>
            {loading === 'pending' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <CircularProgress
                        sx={{
                            color:
                                mode === 'light'
                                    ? 'primary.main'
                                    : 'secondary.main',
                        }}
                    />
                </Box>
            )}
            {loading === 'succeeded' && (
                <Box sx={{ flexGrow: 1, mt: 3, padding: 3 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
                    >
                        {data?.length > 0 &&
                            data.map((item) => (
                                <Grid
                                    xs={4}
                                    sm={4}
                                    md={6}
                                    lg={4}
                                    key={item?.petId}
                                >
                                    <RecipeReviewCard item={item} />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            )}
        </>
    )
}
