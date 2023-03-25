import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import SavingsIcon from '@mui/icons-material/Savings'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { deepOrange } from '@mui/material/colors'

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
                    borderColor: 'secondary.main',
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
                        variant="h6"
                        component="h2"
                    >
                        Donates
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Atque, illum laboriosam! Ipsam et nam nesciunt at eum
                        dolor corrupti, possimus ratione neque quisquam
                        perspiciatis dolorum totam, eaque unde nisi magni? Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Alias
                        possimus atque ad reiciendis molestias! At alias
                        necessitatibus soluta iusto a, ex assumenda repudiandae
                        amet dolore ab unde sapiente omnis quaerat.
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
