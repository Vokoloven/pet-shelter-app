import * as React from 'react'
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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
}

type Items = {
    item: DocumentData
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

export default function RecipeReviewCard({ item }: Items) {
    const { mode } = useSelector(selectTheme)
    const [expanded, setExpanded] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const { access } = useSelector(selectAccessUser)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const dispatch = useDispatch<AppDispatch>()

    const onClickHandle = async (petId: string) => {
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
                action={
                    access.actualAccess === access.admin ||
                    access.actualAccess === access.moderator ? (
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
                                        item?.petId
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
                    ) : (
                        false
                    )
                }
                title={item?.name}
                subheader={`Age: ${item?.age} | Sex: ${item?.sex}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={item?.photoUrl}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {`${item?.description.substring(0, 100).trim()}...`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
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
                    {/* <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                    </Typography> */}
                </CardContent>
            </Collapse>
        </Card>
    )
}
