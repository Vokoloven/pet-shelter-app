import { Box } from '@mui/system'
import { px2vw } from 'utils/responsiveWidth'

type Props = {
    imgUrl: string
    alt: string
    pl: number
    href: string
}

export const Social = ({ imgUrl, alt, pl, href }: Props) => {
    return (
        <Box>
            <Box
                component={'a'}
                href={href}
                target={'_blank'}
                rel={'noreferrer noopener nofollow'}
            >
                <Box
                    component={'img'}
                    src={imgUrl}
                    alt={alt}
                    width={'45px'}
                    height={'45px'}
                    sx={(theme) => ({
                        width: px2vw(50),
                        height: px2vw(50),
                        mt: 2,
                        pl,
                        [theme.breakpoints.down('xl')]: {
                            width: px2vw(45, 1300),
                            height: px2vw(45, 1300),
                        },
                        [theme.breakpoints.down('lg')]: {
                            width: px2vw(40, 600),
                            height: px2vw(40, 600),
                        },
                        [theme.breakpoints.down('md')]: {
                            width: px2vw(40, 400),
                            height: px2vw(40, 400),
                        },
                        [theme.breakpoints.down('sm')]: {
                            width: px2vw(40, 300),
                            height: px2vw(40, 300),
                        },
                    })}
                />
            </Box>
        </Box>
    )
}
