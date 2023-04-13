import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { getDesignTokens } from 'theme/theme'
import { ResponsiveAppBar } from 'components/AppBar/AppBar'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'components/Home/Home'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { selectAuth } from 'redux/authSlice/selectAuth'
import { About } from 'components/About/About'
import { Contacts } from 'components/Contacts/Contacts'
import { Gallery } from 'components/Gallery.tsx/Gallery'
import { NotFound } from 'components/NotFound/NotFound'
import { UserAccess } from 'components/UserAccess/UserAccess'
import { AddPet } from 'components/AddPet/AddPet'
import { AppDispatch } from 'redux/store'
import { getData } from 'redux/getDataSlice/getData.service'
import { useRef } from 'react'
import { AdminRoute, ModeratorRoute } from 'routes/PrivateRoutes'
import { SnackbarProvider } from 'notistack'
import { closeSnackbar } from 'notistack'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { getAccessUserData } from 'redux/accessSlice/getAccessUserData.service'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'

export const App = () => {
    const { mode } = useSelector(selectTheme)
    const {
        user: { email },
    } = useSelector(selectAuth)
    const { accessUser } = useSelector(selectAccessUser)
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
    const dispatch = useDispatch<AppDispatch>()
    const isFirstRender = useRef<boolean>(true)
    const [access, setAccess] = useState<number | null>(null)

    type User = {
        email: string
        accessId: string
    }

    enum Access {
        ADMIN,
        MODERATOR,
    }

    useEffect(() => {
        if (accessUser.length > 0) {
            const admin = accessUser[0]?.admin
            const moderator = accessUser[1]?.moderator

            const adminStatus = admin.some((item: User) => item.email === email)
            const moderatorStatus = moderator.some(
                (item: User) => item.email === email
            )

            if (adminStatus) {
                setAccess(Access.ADMIN)
            } else if (moderatorStatus) {
                setAccess(Access.MODERATOR)
            } else {
                setAccess(null)
            }
        }
    }, [Access.ADMIN, Access.MODERATOR, accessUser, email])

    useEffect(() => {
        if (isFirstRender.current) {
            dispatch(getData('cats'))
            dispatch(getAccessUserData())
            isFirstRender.current = false
            return
        }
    }, [dispatch, isFirstRender])

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
                    <Route
                        path={'/'}
                        element={<ResponsiveAppBar access={access} />}
                    >
                        <Route index element={<Home />} />
                        <Route path={'gallery'} element={<Gallery />} />
                        <Route path={'contacts'} element={<Contacts />} />
                        <Route path={'about'} element={<About />} />
                        <Route
                            path={'addpet'}
                            element={
                                <ModeratorRoute status={access}>
                                    <AddPet />
                                </ModeratorRoute>
                            }
                        />
                        <Route
                            path={'useraccess'}
                            element={
                                <AdminRoute status={access}>
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
