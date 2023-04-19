export type CustomTheme = {
    palette: {
        primary: {
            [x: string]: string
        }
        [x: string]: string | object
        secondary: {
            [x: string]: string
        }
    }
    breakpoints: {
        values: {
            xs: number
            sm: number
            md: number
            lg: number
            xl: number
        }
    }
}

export type AccessType = {
    actualAccess: number | null
    admin: number | null
    moderator: number | null
}
