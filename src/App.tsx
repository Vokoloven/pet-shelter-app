import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { getDesignTokens } from 'theme/theme'
import { ResponsiveAppBar } from 'components/AppBar/AppBar'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'components/Home/Home'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { About } from 'components/About/About'
import { Contacts } from 'components/Contacts/Contacts'
import { Gallery } from 'components/Gallery.tsx/Gallery'
import { NotFound } from 'components/NotFound/NotFound'

export const App = () => {
    const { mode } = useSelector(selectTheme)
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

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
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </ThemeProvider>
    )
}
