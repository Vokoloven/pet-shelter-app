import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function SharePopover() {
    const [popover, setPopover] = React.useState<HTMLButtonElement | null>(null)

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPopover(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setPopover(null)
    }

    const openPopover = Boolean(popover)
    const popoverId = openPopover ? 'simple-popover' : undefined

    return (
        <div>
            <Button
                aria-describedby={popoverId}
                variant="contained"
                onClick={handlePopoverClick}
            >
                Open Popover
            </Button>
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
                <Typography sx={{ p: 2 }}>
                    The content of the Popover.
                </Typography>
            </Popover>
        </div>
    )
}
