import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import RecipeReviewCard from './Card'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import CircularProgress from '@mui/material/CircularProgress'
import { doc, setDoc } from 'firebase/firestore'
import { DocumentData } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { selectAuth } from 'redux/authSlice/selectAuth'
import { getFavoriteData } from 'redux/getDataFavoriteSlice/getFavoriteData.service'
import { AppDispatch } from 'redux/store'
import { selectFavoriteData } from 'redux/getDataFavoriteSlice/selectFavoriteData'

export default function ResponsiveGrid() {
    const { mode } = useSelector(selectTheme)
    const { user } = useSelector(selectAuth)
    const dispatch = useDispatch<AppDispatch>()
    const { favoriteData, loading } = useSelector(selectFavoriteData)
    const favoriteDataRef = doc(db, 'favorites', `${user?.email}`)

    const onClickHandleFavorite = async (petId: string) => {
        const coincidence = favoriteData.some(
            (value: DocumentData) => value.petId === petId
        )
        if (coincidence) {
            const removeFromFavorite = favoriteData.filter(
                (value: DocumentData) => value.petId !== petId
            )
            const data = [...removeFromFavorite]
            await setDoc(favoriteDataRef, { data })
            dispatch(getFavoriteData(user?.email))
            return
        }
    }

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
                        {favoriteData?.length > 0 &&
                            favoriteData.map((item: DocumentData) => (
                                <Grid
                                    xs={4}
                                    sm={4}
                                    md={6}
                                    lg={4}
                                    key={item?.petId}
                                >
                                    <RecipeReviewCard
                                        item={item}
                                        onClickHandleFavorite={
                                            onClickHandleFavorite
                                        }
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            )}
        </>
    )
}
