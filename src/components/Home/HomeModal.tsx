import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import SavingsIcon from '@mui/icons-material/Savings'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { deepOrange } from '@mui/material/colors'
import Mono from 'images/icons/mono.png'
import Privat from 'images/icons/privat.png'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    border: `2px solid`,
    boxShadow: 24,
    p: 4,
}

export function BasicModal() {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const { mode } = useSelector(selectTheme)

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="outlined"
                sx={(theme) => ({
                    borderColor:
                        mode === 'dark' ? 'secondary.main' : 'primary.main',
                    '&:hover': {
                        backgroundColor: 'secondary.light',
                    },
                    color: mode === 'dark' ? 'secondary.main' : 'primary.main',
                    [theme.breakpoints.down('sm')]: {
                        marginTop: '30px',
                    },
                })}
                endIcon={<SavingsIcon />}
            >
                Help Us
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={(theme) => ({
                        ...style,
                        backgroundColor:
                            mode === 'dark'
                                ? 'background.paper'
                                : 'primary.light',
                        color:
                            mode === 'dark'
                                ? 'secondary.main'
                                : 'secondary.contrastText',
                        borderColor: mode === 'dark' ? deepOrange[500] : '#000',
                        [theme.breakpoints.down('sm')]: {
                            minWidth: 250,
                        },
                    })}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                    >
                        Donates
                    </Typography>
                    <Typography variant={'body1'} sx={{ mt: 2 }}>
                        Наша група працює на добровільних заходах і ніякого
                        допоміжного фінансування ми не отримуємо. Тому ніколи не
                        відмовляємось від підтримки фінансової, закупки корма та
                        наповнювача і автодопомоги. За отримані  кошти
                        обов'язково звітуємось. Закріплюємо номери карт, для
                        бажаючих нас підтримати. Донати кормом також приймаємо.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Box
                            component={'img'}
                            src={Mono}
                            alt={'monobank'}
                            sx={{ width: '50px' }}
                        />
                        <Typography
                            component={'p'}
                            variant={'h6'}
                            sx={{ ml: 2 }}
                        >
                            4441114442317689 Воловенко Лора
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
