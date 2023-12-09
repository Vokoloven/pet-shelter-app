import { Box } from '@mui/material'
import { Titles } from './Titles'
import Facebook from 'images/icons/facebook.png'
import Instagram from 'images/icons/instagram.png'
import Telegram from 'images/icons/telegram.png'
import { Social } from './Social'
import { googleMapSize } from 'utils/gogleMapSize'
import { Person } from './Person'
import Paper from '@mui/material/Paper'

const windowWidth = window.screen.width

export const Contacts = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mt: 3,
                    ml: 'auto',
                    mr: 'auto',
                    pl: 3,
                    pr: 3,
                    pb: 3,
                }}
            >
                <Titles title={'Our Contacts'} icon={'contacts'} />
                <Person contactNumber={'Лора: +380 97 552 96 96'} />
            </Paper>
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mt: 3,
                    ml: 'auto',
                    mr: 'auto',
                    pl: 3,
                    pr: 3,
                    pb: 3,
                }}
            >
                <Titles title={'We Are In Social Network'} icon={'social'} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Social
                        imgUrl={Facebook}
                        alt={'facebook'}
                        pl={0}
                        href={'https://facebook.com/groups/1136278427079955/'}
                    />
                    <Social
                        imgUrl={Instagram}
                        alt={'instagram'}
                        pl={3}
                        href={
                            'https://instagram.com/kartonnyy.budynok?igshid=YmMyMTA2M2Y='
                        }
                    />
                    <Social
                        imgUrl={Telegram}
                        alt={'telegram'}
                        pl={3}
                        href={'https://t.me/voluntaryGatne'}
                    />
                </Box>
            </Paper>

            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mt: 3,
                    ml: 'auto',
                    mr: 'auto',
                    pl: 1,
                    pr: 1,
                    pb: 3,
                }}
            >
                <Titles title={'Our Location'} icon={'location'} />
                <Box sx={{ mt: 2 }}>
                    <iframe
                        title="Cats Shelter"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d655.1310531528922!2d30.42288739048963!3d50.34933480824363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c91454d01813%3A0xc9d60c366c7000ee!2z0JbQmiDQpNC10LzQuNC70Lg!5e0!3m2!1sru!2sua!4v1682068728270!5m2!1sru!2sua"
                        width={googleMapSize(windowWidth) ?? '500px'}
                        height={googleMapSize(windowWidth) ?? '500px'}
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Box>
            </Paper>
        </Box>
    )
}
