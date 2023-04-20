import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { DocumentData } from 'firebase/firestore'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { selectData } from 'redux/getDataSlice/selectData'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { px2vw } from 'utils/responsiveWidth'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const CatDetails = () => {
    const { petId } = useParams()
    const { mode } = useSelector(selectTheme)
    const { data, loading } = useSelector(selectData)
    const navigate = useNavigate()
    const [item, setItem] = useState<DocumentData | null>(null)

    useEffect(() => {
        const findedItem = data.find((item) => item.petId === petId)
        if (findedItem !== undefined) {
            setItem(findedItem)
        }
    }, [data, petId])

    return (
        <>
            {loading === 'pending' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <CircularProgress
                        sx={{
                            color:
                                mode === 'light'
                                    ? 'primary.main'
                                    : 'secondary.main',
                        }}
                    />
                </Box>
            )}
            {item !== null && (
                <Container maxWidth={'xl'} sx={{ mt: 3 }}>
                    <Paper
                        elevation={4}
                        sx={{
                            display: 'flex',
                            padding: 3,
                            flexDirection: {
                                xs: 'column',
                                md: 'row',
                            },
                        }}
                    >
                        <Box
                            component={'img'}
                            src={item?.photoUrl}
                            alt={item?.name}
                            sx={(theme) => ({
                                borderRadius: '10px',
                                [theme.breakpoints.down('xl')]: {
                                    height: px2vw(500, 1300),
                                },
                                [theme.breakpoints.down('lg')]: {
                                    height: px2vw(500, 900),
                                },
                                [theme.breakpoints.down('md')]: {
                                    display: 'block',
                                    maxWidth: '100%',
                                    height: 'auto',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    display: 'block',
                                    maxWidth: '100%',
                                    height: px2vw(200, 200),
                                },
                            })}
                        />
                        <Box>
                            <Button
                                variant={'outlined'}
                                startIcon={<ArrowBackIcon />}
                                sx={(theme) => ({
                                    ml: 3,
                                    borderColor:
                                        mode === 'dark'
                                            ? 'secondary.main'
                                            : 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'secondary.light',
                                    },
                                    color:
                                        mode === 'dark'
                                            ? 'secondary.main'
                                            : 'primary.main',
                                    [theme.breakpoints.down('md')]: {
                                        mt: 3,
                                    },
                                })}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>
                            <Typography
                                component={'h1'}
                                sx={(theme) => ({
                                    fontWeight: 400,
                                    ml: 5,
                                    fontSize: px2vw(40),
                                    [theme.breakpoints.down('xl')]: {
                                        fontSize: px2vw(40, 1300),
                                    },
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: px2vw(40, 900),
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: px2vw(40, 600),
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                        mt: 1,
                                        fontSize: px2vw(50, 600),
                                    },
                                })}
                            >
                                {item?.name}
                            </Typography>
                            <Typography
                                component={'h2'}
                                sx={(theme) => ({
                                    ml: 3,
                                    mt: 1,
                                    fontSize: px2vw(30),
                                    [theme.breakpoints.down('xl')]: {
                                        fontSize: px2vw(22, 1300),
                                    },
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: px2vw(22, 900),
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: px2vw(20, 600),
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: px2vw(30, 600),
                                    },
                                })}
                            >
                                {`Age: ${item?.age} | Sex: ${item?.sex}`}
                            </Typography>
                            <Typography
                                component={'h3'}
                                sx={(theme) => ({
                                    ml: 3,
                                    mt: 3,
                                    fontSize: px2vw(16),
                                    [theme.breakpoints.down('xl')]: {
                                        fontSize: px2vw(18, 1300),
                                    },
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: px2vw(18, 900),
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: px2vw(14, 600),
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: px2vw(20, 600),
                                    },
                                })}
                            >
                                {item?.description}
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            )}
        </>
    )
}
