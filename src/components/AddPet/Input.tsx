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
}

export default function MultilineTextFields({
    register,
    handleSubmit,
    onSubmit,
    onError,
    setValue,
}: Props) {
    const { mode } = useSelector(selectTheme)

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
                />
                <TextField
                    id="age"
                    label="Age"
                    maxRows={4}
                    variant="standard"
                    {...register('age')}
                />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="standard"
                    {...register('description')}
                />
            </Box>
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ mt: 3, width: '100px' }}>
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
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', mt: 3 }}>
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
                    Add Pet
                </Button>
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{ ml: 7 }}
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
                                mode === 'dark'
                                    ? 'secondary.main'
                                    : 'primary.main',
                        }}
                    />
                </IconButton>
            </Box>
        </Box>
    )
}
