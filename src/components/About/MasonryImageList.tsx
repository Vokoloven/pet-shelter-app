import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { itemsDataMasonry } from './itemsDataMasonry'

export default function MasonryImageList() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Box sx={{ width: 700, height: 1050 }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {itemsDataMasonry.map((item) => (
                        <ImageListItem key={item}>
                            <img
                                src={`${item}?w=248&fit=crop&auto=format`}
                                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={'Cat'}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Box>
    )
}
