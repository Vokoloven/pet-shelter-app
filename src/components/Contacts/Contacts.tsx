import { Box } from '@mui/material'
import { Titles } from './Titles'

export const Contacts = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Titles title={'Our contacts'} icon={'contact'} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Titles title={'We are in social network'} icon={'social'} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Titles title={'Our Location'} icon={'location'} />
                <iframe
                    title="Cats Shelter"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d655.1310531528922!2d30.42288739048963!3d50.34933480824363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c91454d01813%3A0xc9d60c366c7000ee!2z0JbQmiDQpNC10LzQuNC70Lg!5e0!3m2!1sru!2sua!4v1682068728270!5m2!1sru!2sua"
                    width="405"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </Box>
        </Box>
    )
}
