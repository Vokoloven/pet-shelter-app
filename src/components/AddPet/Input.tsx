import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Handler = {
    onChangeHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChangeFileHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmitPhotoHandler: () => void
    name: string
    age: string
    description: string
}

type FormValues = {
    name: string
    age: string
    description: string
}

export default function MultilineTextFields({
    onChangeHandler,
    onChangeFileHandler,
    onSubmitPhotoHandler,
    age,
    name,
    description,
}: Handler) {
    const { mode } = useSelector(selectTheme)
    const { register, handleSubmit } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'column' }}
                onChange={onChangeHandler}
            >
                <TextField
                    id="name"
                    label="Name"
                    multiline
                    maxRows={4}
                    variant="standard"
                    value={name}
                    {...register('name')}
                />
                <TextField
                    id="age"
                    label="Age"
                    multiline
                    maxRows={4}
                    variant="standard"
                    value={age}
                    {...register('age')}
                />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="standard"
                    value={description}
                />
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
                    onClick={onSubmitPhotoHandler}
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
                        onChange={onChangeFileHandler}
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
