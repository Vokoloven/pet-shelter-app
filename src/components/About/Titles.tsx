import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/themeSlice/selectTheme'
import { px2vw } from 'utils/responsiveWidth'
import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'

export const Titles = () => {
    const { mode } = useSelector(selectTheme)

    return (
        <Paper
            elevation={4}
            sx={{
                mt: 3,
                ml: 1,
                mr: 1,
            }}
        >
            <Typography
                component={'h1'}
                sx={(theme) => ({
                    fontWeight: 700,
                    fontSize: px2vw(40),
                    pl: 3,
                    color: mode === 'light' ? 'primary.main' : 'secondary.main',
                    [theme.breakpoints.down('xl')]: {
                        fontSize: px2vw(40, 1300),
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: px2vw(30, 800),
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: px2vw(30, 500),
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: px2vw(30, 500),
                    },
                })}
            >
                About Us
            </Typography>
            <Typography
                component={'h1'}
                sx={(theme) => ({
                    fontWeight: 700,
                    fontSize: px2vw(10),
                    pb: 3,
                    pl: 3,
                    pr: 3,
                    whiteSpace: 'pre-line',
                    color: mode === 'light' ? 'primary.main' : 'secondary.main',
                    [theme.breakpoints.down('xl')]: {
                        fontSize: px2vw(17, 1300),
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: px2vw(15, 800),
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: px2vw(15, 500),
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: px2vw(15, 500),
                    },
                })}
            >
                Ми маленька волонтерська група, настільки маленька, що про нас
                ніхто і чув, але ж ми є, і ми працюємо та стараємось...З самого
                початку під нашу опіку потрапило 16 котусиків, шлях був тяжкий,
                болючий, часто вже хотілось все кинути, але нас підтримували і
                ми йшли далі. Потім втрата одна за одною, потім знову
                поповнення, постійне занепокоєння та спроби спіймати, але ж
                результат є. На сьогоднішній день свій дім знайшли 10 хвостиків.
                Ще 4 котисики чекають на своїх господарів, і 2 вперто не хочуть
                до нас іти. Наша основана мета - спокійне та довге життя
                чотирилапих. Для цього ми забезпечуємо повне кураторство. Ми
                гарантуємо проведення стерилізацій/кастрацій, обробку та
                вакцинації + зв'язок з нами 24/7. Ми дуже вдячні за підтримку
                нашим патронам, адже без них, ми б не змогли організувати наш
                міні-притулок та утримувати його. Ми працюємо та розвиваємось
                кожного дня, знаходимо та аналізуємо багато інформації і готові
                ділитись з нею з усіма. Всі наші хвостики максимально
                орієнтовані на людей, ми над цим дуже працюємо і ростимо їх як
                для себе. Можемо навіть ділитися відгуками. Звітуємось та
                скидаємо фоточки наших котуньчиків часто, тому милуватися можна
                довго. Сподіваємось, вам тут буде комфортно з нами і будемо
                вдячні за допомогу та реакції.
            </Typography>
        </Paper>
    )
}
