import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DocumentData } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { CardActionArea } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
}

type Items = {
    item: DocumentData
    onClickHandleFavorite: (petId: string, _: React.MouseEvent) => void
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
    const [expanded, setExpanded] = useState(false)

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
                <IconButton
                    aria-label="add to favorites"
                    onClick={onClickHandleFavorite.bind(null, item?.petId)}
                >
                    <FavoriteIcon
                        sx={{
                            color: 'primary.error',
                        }}
                    />
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
                </CardContent>
            </Collapse>
        </Card>
    )
}
