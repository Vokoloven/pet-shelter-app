import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import { selectData } from 'redux/getDataSlice/selectData'
import FormHelperText from '@mui/material/FormHelperText'

import {
    UseFormRegister,
    UseFormHandleSubmit,
    SubmitHandler,
    SubmitErrorHandler,
    UseFormSetValue,
} from 'react-hook-form'
import { Inputs } from './AddPet'

type Props = {
    register: UseFormRegister<Inputs>
    handleSubmit: UseFormHandleSubmit<Inputs>
    onSubmit: SubmitHandler<Inputs>
    onError: SubmitErrorHandler<Inputs>
    setValue: UseFormSetValue<Inputs>
    submittedCat: boolean
    errors: Partial<Inputs>
}

export default function MultilineTextFields({
    register,
    handleSubmit,
    onSubmit,
    onError,
    setValue,
    submittedCat,
    errors,
}: Props) {
    const { mode } = useSelector(selectTheme)
    const { loading } = useSelector(selectData)

    const buttonSx = {
        '&:hover': {
            backgroundColor:
                mode === 'dark' ? 'secondary.dark' : 'primary.dark',
        },
        backgroundColor: mode === 'light' ? 'primary.main' : 'secondary.main',
        ...(submittedCat && {
            backgroundColor: 'primary.success',
            '&:hover': {
                backgroundColor: 'successHover',
            },
        }),
    }

    const handleChange = (event: SelectChangeEvent) => {
        setValue('sex', event.target.value as string)
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
                    id="name"
                    label="Name"
                    maxRows={4}
                    variant="standard"
                    {...register('name')}
                    error={!!errors?.name ? true : false}
                    helperText={!!errors?.name ? errors.name : null}
                />
                <TextField
                    id="age"
                    label="Age"
                    maxRows={4}
                    variant="standard"
                    {...register('age')}
                    error={!!errors?.age ? true : false}
                    helperText={!!errors?.age ? errors.age : null}
                />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="standard"
                    {...register('description')}
                    error={!!errors?.description ? true : false}
                    helperText={
                        !!errors?.description ? errors.description : null
                    }
                />
            </Box>
            <Box sx={{ minWidth: 120 }}>
                <FormControl
                    sx={{ mt: 3, width: '100px' }}
                    error={!!errors?.sex ? true : false}
                >
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...register('sex')}
                        label="Sex"
                        onChange={handleChange}
                        defaultValue={''}
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                    {!!errors?.sex ? (
                        <FormHelperText>{errors.sex}</FormHelperText>
                    ) : null}
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', mt: 3, alignItems: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading === 'pending' ? true : false}
                        sx={buttonSx}
                    >
                        {loading === 'pending' ? 'Loading...' : 'Add Pet'}
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
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                        ml: 7,
                        color:
                            mode === 'light'
                                ? 'primary.main'
                                : 'secondary.main',
                    }}
                >
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        {...register('photo')}
                    />
                    <PhotoCamera
                        sx={{
                            color:
                                mode === 'light'
                                    ? 'primary.main'
                                    : 'secondary.main',
                        }}
                    />
                </IconButton>
            </Box>
            {!!errors?.photo && (
                <FormHelperText sx={{ color: 'primary.error' }}>
                    {errors?.photo}
                </FormHelperText>
            )}
        </Box>
    )
}
