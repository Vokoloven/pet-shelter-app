import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { getDesignTokens } from 'theme/theme'
import { ResponsiveAppBar } from 'components/AppBar/AppBar'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'components/Home/Home'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'

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
                }}
            />
            <ResponsiveAppBar />
            <Routes>
                <Route path={'/'} element={<Home />} />
            </Routes>
        </ThemeProvider>
    )
}
