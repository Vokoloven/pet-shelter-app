/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Avatar from '@mui/material/Avatar'
import { Switch } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { themeToggler } from 'redux/themeSlice/themeSlice'
import { NavLink } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import AddModeratorIcon from '@mui/icons-material/AddModerator'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import GoogleIcon from '@mui/icons-material/Google'
import Tooltip from '@mui/material/Tooltip'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import Popover from '@mui/material/Popover'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
import { authUser, authToken, logOutUser } from 'redux/authSlice/authSlice'
import { selectAuth } from 'redux/authSlice/selectAuth'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { getAccessUserData } from 'redux/accessSlice/getAccessUserData.service'
import { AppDispatch } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'
import { AccessType } from 'types/globalTypes'
import { setAccess } from 'redux/accessSlice/accessSlice'

const pages: Readonly<string[]> = ['Home', 'Gallery', 'Contacts', 'About']

const provider = new GoogleAuthProvider()

export function ResponsiveAppBar() {
    const { mode } = useSelector(selectTheme)
    const { user, loggedIn } = useSelector(selectAuth)
    const { access } = useSelector(selectAccessUser)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    function createMenuData(tab: string | null, access: AccessType) {
        if (tab === 'UserAccess' && access.actualAccess === access.admin) {
            return tab
        } else if (
            (tab === 'AddPet' && access.actualAccess === access.moderator) ||
            access.actualAccess === access.admin
        ) {
            return tab
        } else {
            return null
        }
    }
    const menuData = [
        createMenuData('UserAccess', access),
        createMenuData('AddPet', access),
    ]

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    )
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = (e: React.MouseEvent<HTMLElement>) => {
        const value = e.currentTarget.textContent
        if (value === 'Logout') {
            signOut(auth)
                .then(() => {
                    dispatch(logOutUser())
                    dispatch(setAccess(null))
                    setAnchorEl(null)
                    navigate('/')
                    enqueueSnackbar('You logged out', { variant: 'success' })
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        setAnchorElUser(null)
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

    const signInGoogleAccount = () => {
        setAnchorEl(null)
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential?.accessToken
                const user = result.user
                if (token && user) {
                    dispatch(authToken(token))
                    dispatch(authUser(user))
                    dispatch(getAccessUserData())
                    enqueueSnackbar('You logged in', { variant: 'success' })
                }
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.customData.email
                const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }

    return (
        <>
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
                        <Box
                            sx={(theme) => ({
                                display: 'none',
                                alignItems: 'center',
                                flexGrow: 10,
                                mr: 1,
                                [theme.breakpoints.down('md')]: {
                                    display: 'flex',
                                },
                            })}
                        >
                            <PetsIcon sx={{ mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                sx={(theme) => ({
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    [theme.breakpoints.down('sm')]: {
                                        letterSpacing: 0,
                                    },
                                })}
                            >
                                CATS SHELTER
                            </Typography>
                        </Box>
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
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                },
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
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {loggedIn === false && (
                                <div>
                                    <Button
                                        variant="text"
                                        aria-describedby={id}
                                        onClick={handleClick}
                                        endIcon={<LoginIcon />}
                                        sx={{
                                            color:
                                                mode === 'light'
                                                    ? 'primary.contrastText'
                                                    : 'secondary.main',
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <IconButton
                                            onClick={signInGoogleAccount}
                                            sx={{
                                                color:
                                                    mode === 'light'
                                                        ? 'primary.main'
                                                        : 'secondary.main',
                                            }}
                                        >
                                            <GoogleIcon
                                                sx={{
                                                    color:
                                                        mode === 'light'
                                                            ? 'primary.main'
                                                            : 'secondary.main',
                                                }}
                                            />
                                        </IconButton>
                                    </Popover>
                                </div>
                            )}
                        </Box>
                        {loggedIn === true && (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt={user?.displayName!}
                                            src={user?.photoURL!}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {menuData.map(
                                        (item, index) =>
                                            item !== null && (
                                                <NavLink
                                                    key={index}
                                                    to={item.toLowerCase()}
                                                    onClick={
                                                        handleCloseUserMenu
                                                    }
                                                >
                                                    <MenuItem
                                                        sx={{
                                                            color:
                                                                mode === 'light'
                                                                    ? 'primary.main'
                                                                    : 'secondary.main',
                                                        }}
                                                    >
                                                        <Typography
                                                            textAlign="center"
                                                            sx={{
                                                                color:
                                                                    mode ===
                                                                    'light'
                                                                        ? 'primary.main'
                                                                        : 'secondary.main',
                                                            }}
                                                        >
                                                            {item ===
                                                                'UserAccess' &&
                                                                'User Access'}
                                                            {item ===
                                                                'AddPet' &&
                                                                'Add Pet'}
                                                        </Typography>
                                                        {item ===
                                                            'UserAccess' && (
                                                            <AddModeratorIcon
                                                                sx={{
                                                                    ml: 1,
                                                                    color:
                                                                        mode ===
                                                                        'light'
                                                                            ? 'primary.main'
                                                                            : 'secondary.main',
                                                                }}
                                                            />
                                                        )}
                                                        {item === 'AddPet' && (
                                                            <PetsIcon
                                                                sx={{
                                                                    ml: 1,
                                                                    color:
                                                                        mode ===
                                                                        'light'
                                                                            ? 'primary.main'
                                                                            : 'secondary.main',
                                                                }}
                                                            />
                                                        )}
                                                    </MenuItem>
                                                </NavLink>
                                            )
                                    )}
                                    <MenuItem
                                        onClick={handleCloseUserMenu}
                                        sx={{
                                            color:
                                                mode === 'light'
                                                    ? 'primary.main'
                                                    : 'secondary.main',
                                        }}
                                    >
                                        <Typography
                                            textAlign="center"
                                            sx={{
                                                color:
                                                    mode === 'light'
                                                        ? 'primary.main'
                                                        : 'secondary.main',
                                            }}
                                        >
                                            Logout
                                        </Typography>
                                        <LogoutIcon
                                            sx={{
                                                ml: 1,
                                                color:
                                                    mode === 'light'
                                                        ? 'primary.main'
                                                        : 'secondary.main',
                                            }}
                                        />
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    )
}
