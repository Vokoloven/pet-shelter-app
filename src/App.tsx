import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { getDesignTokens } from 'theme/theme'
import { ResponsiveAppBar } from 'components/AppBar/AppBar'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'components/Home/Home'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { About } from 'components/About/About'
import { Favorite } from 'components/Favorite/Favorite'
import { Contacts } from 'components/Contacts/Contacts'
import { Gallery } from 'components/Gallery.tsx/Gallery'
import { NotFound } from 'components/NotFound/NotFound'
import { UserAccess } from 'components/UserAccess/UserAccess'
import { AddPet } from 'components/AddPet/AddPet'
import { AppDispatch } from 'redux/store'
import { getData } from 'redux/getDataSlice/getData.service'
import { useRef } from 'react'
import {
    AdminRoute,
    ModeratorRoute,
    AuthorizedRoute,
} from 'routes/PrivateRoutes'
import { SnackbarProvider } from 'notistack'
import { closeSnackbar } from 'notistack'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { getAccessUserData } from 'redux/accessSlice/getAccessUserData.service'
import { getFavoriteData } from 'redux/getDataFavoriteSlice/getFavoriteData.service'
import { useAccess } from 'hooks/useAccess'
import { selectAuth } from 'redux/authSlice/selectAuth'
import { CatDetails } from 'components/CatDetails/CatDetails'

export const App = () => {
    const { mode } = useSelector(selectTheme)
    const { loggedIn, user } = useSelector(selectAuth)
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
    const dispatch = useDispatch<AppDispatch>()
    const isFirstRender = useRef<boolean>(true)

    useAccess()
    useEffect(() => {
        if (isFirstRender.current) {
            dispatch(getData('cats'))
            dispatch(getAccessUserData())
            if (loggedIn) {
                dispatch(getFavoriteData(user?.email))
            }
            isFirstRender.current = false
            return
        }
    }, [dispatch, isFirstRender, loggedIn, user?.email])

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles
                styles={{
                    body: {
                        backgroundColor: theme.palette.primary.light,
                    },
                    a: {
                        textDecoration: 'none',
                        color: 'inherit',
                    },
                    img: {
                        display: 'block',
                        maxWidth: '100%',
                        height: 'auto',
                    },
                }}
            />
            <SnackbarProvider
                maxSnack={5}
                autoHideDuration={3000}
                action={(snackbarId) => (
                    <IconButton
                        onClick={() => closeSnackbar(snackbarId)}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                            color:
                                mode === 'light'
                                    ? 'primary.contrastText'
                                    : 'primary.contrastText',
                        }}
                    >
                        <CloseIcon
                            sx={{
                                color:
                                    mode === 'light'
                                        ? 'primary.contrastText'
                                        : 'primary.contrastText',
                            }}
                        />
                    </IconButton>
                )}
            >
                <Routes>
                    <Route path={'/'} element={<ResponsiveAppBar />}>
                        <Route index element={<Home />} />
                        <Route path={'gallery'} element={<Gallery />} />
                        <Route
                            path={'gallery/:petId'}
                            element={<CatDetails />}
                        />
                        <Route path={'contacts'} element={<Contacts />} />
                        <Route path={'about'} element={<About />} />
                        <Route
                            path={'favorite'}
                            element={
                                <AuthorizedRoute>
                                    <Favorite />
                                </AuthorizedRoute>
                            }
                        />
                        <Route
                            path={'addpet'}
                            element={
                                <ModeratorRoute>
                                    <AddPet />
                                </ModeratorRoute>
                            }
                        />
                        <Route
                            path={'useraccess'}
                            element={
                                <AdminRoute>
                                    <UserAccess />
                                </AdminRoute>
                            }
                        />
                        <Route path={'*'} element={<NotFound />} />
                    </Route>
                </Routes>
            </SnackbarProvider>
        </ThemeProvider>
    )
}
