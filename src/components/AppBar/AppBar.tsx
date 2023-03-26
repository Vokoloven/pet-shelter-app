import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import PetsIcon from '@mui/icons-material/Pets'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Switch } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { themeToggler } from 'redux/themeSlice/themeSlice'
import { NavLink } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const pages = ['Home', 'Gallery', 'Contacts', 'About']

export function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )

    const { mode } = useSelector(selectTheme)
    const dispatch = useDispatch()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const label = { inputProps: { 'aria-label': 'Color switch demo' } }

    const onChangeHandler = () => {
        if (mode === 'light') {
            dispatch(themeToggler('dark'))
        }
        if (mode === 'dark') {
            dispatch(themeToggler('light'))
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters>
                    <PetsIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CATS SHELTER
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <NavLink
                                    key={page}
                                    to={
                                        page === 'Home'
                                            ? '/'
                                            : `/${page.toLowerCase()}`
                                    }
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {mode === 'light' ? (
                                    <LightModeIcon />
                                ) : (
                                    <DarkModeIcon />
                                )}
                                <Switch
                                    {...label}
                                    color="secondary"
                                    onChange={onChangeHandler}
                                    checked={mode === 'dark' ? true : false}
                                />
                            </Box>
                        </Menu>
                    </Box>
                    <PetsIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CATS SHELTER
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <NavLink
                                key={page}
                                to={
                                    page === 'Home'
                                        ? '/'
                                        : `/${page.toLowerCase()}`
                                }
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        display: 'block',
                                        color:
                                            mode === 'dark'
                                                ? 'secondary.main'
                                                : 'primary.contrastText',
                                    }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                        }}
                    >
                        {mode === 'light' ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )}
                        <Switch
                            {...label}
                            color="secondary"
                            onChange={onChangeHandler}
                            checked={mode === 'dark' ? true : false}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
