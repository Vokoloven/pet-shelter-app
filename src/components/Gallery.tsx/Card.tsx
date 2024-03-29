import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import { DocumentData } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { getData } from 'redux/getDataSlice/getData.service'
import { AppDispatch } from 'redux/store'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'
import { selectFavoriteData } from 'redux/getDataFavoriteSlice/selectFavoriteData'
import FacebookIcon from '@mui/icons-material/Facebook'
import TelegramIcon from '@mui/icons-material/Telegram'
import { FacebookShareButton, TelegramShareButton } from 'react-share'
import { CardActionArea } from '@mui/material'
import { selectAuth } from 'redux/authSlice/selectAuth'
import { NavLink } from 'react-router-dom'
import { storage } from '../../firebase/firebaseConfig'
import { ref, deleteObject } from 'firebase/storage'

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
}

type Items = {
    item: DocumentData
    onClickHandleFavorite: (
        petId: string,
        item: DocumentData,
        _: React.MouseEvent
    ) => void
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export default function RecipeReviewCard({
    item,
    onClickHandleFavorite,
}: Items) {
    const { mode } = useSelector(selectTheme)
    const { favoriteData } = useSelector(selectFavoriteData)
    const [expanded, setExpanded] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null)
    const { access } = useSelector(selectAccessUser)
    const { loggedIn } = useSelector(selectAuth)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const url = `${window.location.href}/${item?.petId}`
    const dispatch = useDispatch<AppDispatch>()

    const onClickHandle = async (petId: string, photoUrl: string) => {
        const catPhotoRef = ref(storage, `${photoUrl}`)
        deleteObject(catPhotoRef)
            .then(() => {
                // File deleted successfully
            })
            .catch((error) => {
                console.log(error)
            })
        await deleteDoc(doc(db, 'cats', petId))
        dispatch(getData('cats'))
        handleClose()
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        const coincidence = favoriteData.some(
            (value: DocumentData) => value.petId === item?.petId
        )

        setIsFavorite(coincidence)
    }, [favoriteData, item?.petId])

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPopover(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setPopover(null)
    }

    const openPopover = Boolean(popover)
    const popoverId = openPopover ? 'simple-popover' : undefined

    const action = () => {
        if (access.actualAccess !== null) {
            return (
                <Box>
                    <IconButton
                        id="basic-button"
                        aria-label="button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem
                            onClick={onClickHandle.bind(
                                null,
                                item?.petId,
                                item?.photoUrl
                            )}
                            sx={{
                                color:
                                    mode === 'light'
                                        ? 'primary.main'
                                        : 'secondary.main',
                            }}
                        >
                            Delete
                            <DeleteForeverIcon sx={{ ml: 1 }} />
                        </MenuItem>
                    </Menu>
                </Box>
            )
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            bgcolor:
                                mode === 'light'
                                    ? 'primary.main'
                                    : 'secondary.main',
                        }}
                        aria-label="recipe"
                    >
                        {item?.name[0]}
                    </Avatar>
                }
                action={action()}
                title={item?.name}
                subheader={`Age: ${item?.age} | Sex: ${item?.sex}`}
            />
            <CardActionArea
                sx={{
                    color: mode === 'light' ? 'primary.main' : 'secondary.main',
                }}
            >
                <NavLink to={`/gallery/${item?.petId}`}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={item?.photoUrl}
                        alt={item?.name}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {`${item?.description.substring(0, 100).trim()}`}
                            {item?.description?.length > 100 ? '...' : null}
                        </Typography>
                    </CardContent>
                </NavLink>
            </CardActionArea>
            <CardActions disableSpacing>
                {loggedIn && (
                    <IconButton
                        aria-label="add to favorites"
                        onClick={onClickHandleFavorite.bind(
                            null,
                            item?.petId,
                            item
                        )}
                    >
                        <FavoriteIcon
                            sx={{
                                color: isFavorite ? 'primary.error' : 'inherit',
                            }}
                        />
                    </IconButton>
                )}
                <IconButton aria-label="share" onClick={handlePopoverClick}>
                    <ShareIcon />
                </IconButton>
                <Popover
                    id={popoverId}
                    open={openPopover}
                    anchorEl={popover}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <FacebookShareButton url={url} hashtag={'#CatsShelter'}>
                        <FacebookIcon
                            sx={{
                                color:
                                    mode === 'light'
                                        ? 'primary.main'
                                        : 'secondary.main',
                                fontSize: '32px',
                            }}
                        />
                    </FacebookShareButton>
                    <TelegramShareButton url={url} title={item?.name}>
                        <TelegramIcon
                            sx={{
                                color:
                                    mode === 'light'
                                        ? 'primary.main'
                                        : 'secondary.main',
                                fontSize: '32px',
                                ml: 1,
                            }}
                        />
                    </TelegramShareButton>
                </Popover>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>More Info:</Typography>
                    <Typography>{item?.description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}
