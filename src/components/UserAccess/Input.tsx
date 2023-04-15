import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { selectAccessUser } from 'redux/accessSlice/selectAccessUser'
import CircularProgress from '@mui/material/CircularProgress'
import FormHelperText from '@mui/material/FormHelperText'

import {
    UseFormRegister,
    UseFormHandleSubmit,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'
import { Inputs } from './UserAccess'

type Props = {
    register: UseFormRegister<Inputs>
    handleSubmit: UseFormHandleSubmit<Inputs>
    onSubmit: SubmitHandler<Inputs>
    onError: SubmitErrorHandler<Inputs>
    admin: boolean
    moderator: boolean
    onHandleChange: (
        access: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
    submittedUser: boolean
    errors: Partial<Inputs>
}

export default function MultilineTextFields({
    register,
    onSubmit,
    onError,
    handleSubmit,
    onHandleChange,
    admin,
    moderator,
    submittedUser,
    errors,
}: Props) {
    const { mode } = useSelector(selectTheme)
    const { loading } = useSelector(selectAccessUser)

    const buttonSx = {
        '&:hover': {
            backgroundColor:
                mode === 'dark' ? 'secondary.dark' : 'primary.dark',
        },
        backgroundColor: mode === 'light' ? 'primary.main' : 'secondary.main',
        ...(submittedUser && {
            backgroundColor: 'primary.success',
            '&:hover': {
                backgroundColor: 'successHover',
            },
        }),
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    id="email"
                    label="Email"
                    maxRows={4}
                    variant="standard"
                    {...register('email')}
                    error={!!errors?.email ? true : false}
                    helperText={!!errors?.email ? errors.email : null}
                />
            </Box>
            <FormGroup {...register('checkbox')}>
                <FormControlLabel
                    sx={{
                        color:
                            mode === 'light'
                                ? 'secondary.contrastText'
                                : 'secondary.main',
                    }}
                    control={
                        <Checkbox
                            checked={admin}
                            onChange={onHandleChange.bind(null, 'admin')}
                            sx={{
                                '&.Mui-checked': {
                                    color:
                                        mode === 'light'
                                            ? 'primary.main'
                                            : 'secondary.main',
                                },
                            }}
                        />
                    }
                    label="Admin"
                />
                <FormControlLabel
                    sx={{
                        color:
                            mode === 'light'
                                ? 'secondary.contrastText'
                                : 'secondary.main',
                    }}
                    control={
                        <Checkbox
                            checked={moderator}
                            onChange={onHandleChange.bind(null, 'moderator')}
                            sx={{
                                '&.Mui-checked': {
                                    color:
                                        mode === 'light'
                                            ? 'primary.main'
                                            : 'secondary.main',
                                },
                            }}
                        />
                    }
                    label="Moderator"
                />
                {!!errors?.checkbox ? (
                    <FormHelperText sx={{ color: 'primary.error' }}>
                        {errors.checkbox}
                    </FormHelperText>
                ) : null}
            </FormGroup>
            {/* <Box sx={{ display: 'flex', mt: 3 }}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        '&:hover': {
                            backgroundColor:
                                mode === 'dark'
                                    ? 'secondary.dark'
                                    : 'primary.dark',
                        },
                        backgroundColor:
                            mode === 'dark' ? 'secondary.main' : 'primary.main',
                    }}
                >
                    Add Access
                </Button>
            </Box> */}
            <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ position: 'relative' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading === 'pending' ? true : false}
                        sx={buttonSx}
                    >
                        {loading === 'pending' ? 'Loading...' : 'Add Access'}
                    </Button>
                    {loading === 'pending' && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: 'primary.success',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
}
