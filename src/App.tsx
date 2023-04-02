import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { getDesignTokens } from 'theme/theme'
import { ResponsiveAppBar } from 'components/AppBar/AppBar'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'components/Home/Home'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { About } from 'components/About/About'
import { Contacts } from 'components/Contacts/Contacts'
import { Gallery } from 'components/Gallery.tsx/Gallery'
import { NotFound } from 'components/NotFound/NotFound'
import { AddPet } from 'components/AddPet/AddPet'
import { AppDispatch } from 'redux/store'
import { getData } from 'redux/getDataSlice/getData.service'
import { useRef } from 'react'

export const App = () => {
    const { mode } = useSelector(selectTheme)
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
    const dispatch = useDispatch<AppDispatch>()
    const isFirstRender = useRef<boolean>(true)

    useEffect(() => {
        if (isFirstRender.current) {
            dispatch(getData('cats'))
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
            <ResponsiveAppBar />
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'gallery'} element={<Gallery />} />
                <Route path={'contacts'} element={<Contacts />} />
                <Route path={'about'} element={<About />} />
                <Route path={'addpet'} element={<AddPet />} />
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </ThemeProvider>
    )
}
