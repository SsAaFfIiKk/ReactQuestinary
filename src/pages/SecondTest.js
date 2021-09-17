import React, { useState } from 'react';
import { CardActions, Container, Typography, Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ButtonBase from '@material-ui/core/ButtonBase';
import { Link as RouterLink } from 'react-router-dom';
import Modal from '../Modal';

const useStyles = makeStyles((theme) => ({
    luscherMain: {
        display: 'flex',
        'flex-direction': 'column',
        border: '1px solid #000',
    },
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
    },
    mainContent: {
        marginTop: theme.spacing(12),
        // width: '100%'
    },
    card: {
        marginBottom: theme.spacing(10)
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
}))

const Card1 = [
    {
        id_color: 1,
        namecolor: 'BLACK',
        color: '#231F20',
        width: '50%',
    },
    {
        id_color: 2,
        namecolor: 'BROWN',
        color: '#C55223',
        width: '50%',
    },
    {
        id_color: 3,
        namecolor: 'PURPLE',
        color: '#D42481',
        width: '50%',
    },
    {
        id_color: 4,
        namecolor: 'YELLOW',
        color: '#F2DD00',
        width: '50%',
    },
    {
        id_color: 5,
        namecolor: 'RED',
        color: '#F12F23',
        width: '50%',
    },
    {
        id_color: 6,
        namecolor: 'GREEN',
        color: '#1D9772',
        width: '50%',
    },
    {
        id_color: 7,
        namecolor: 'BLUE',
        color: "#004983",
        width: '50%',
    },
    {
        id_color: 8,
        namecolor: 'GREY',
        color: '#98938D',
        width: '50%',
    },
];

const Card2 = [
    {
        id_color: 1,
        namecolor: 'GREY',
        color: '#98938D',
        width: '50%',
    },
    {
        id_color: 2,
        namecolor: 'BLUE',
        color: "#004983",
        width: '50%',
    },
    {
        id_color: 3,
        namecolor: 'GREEN',
        color: '#1D9772',
        width: '50%',
    },
    {
        id_color: 4,
        namecolor: 'RED',
        color: '#F12F23',
        width: '50%',
    },
    {
        id_color: 5,
        namecolor: 'YELLOW',
        color: '#F2DD00',
        width: '50%',
    },
    {
        id_color: 6,
        namecolor: 'PURPLE',
        color: '#D42481',
        width: '50%',
    },
    {
        id_color: 7,
        namecolor: 'BROWN',
        color: '#C55223',
        width: '50%',
    },
    {
        id_color: 8,
        namecolor: 'BLACK',
        color: '#231F20',
        width: '50%',
    },
];
const cards = [0];
let ses;

const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
fetch(ses_link, {
    method: "POST",
    body: JSON.stringify({
        "isu_id": localStorage.getItem("id"),
        "test_name": "luscher"
    })
})
    .then((response) => response.json())
    .then(myJson => console.log(myJson))


console.log(ses)
function handleClick(item, answerType) {
    if (!answers[answerType].includes(item.id_color)) {
        answers[answerType].push(item.id_color);
    }
}

let answers = { first: [], second: [] }

function SecondTest() {
    const classes = useStyles();
    const [modalActive, setModalActive] = useState(false)

    function createButton(image, answerType) {
        return (
            <ButtonBase focusRipple key={image.namecolor}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{ width: image.width, }}
                onClick={(event) => {
                    handleClick(image, answerType);
                    event.target.style.backgroundColor = '#ffffff';
                    event.target.parentNode.style.cursor = 'auto';
                    event.target.parentNode.disabled = true
                }}
            >
                <span className={classes.imageSrc}
                    style={{ backgroundColor: image.color, }} />
                <span className={classes.imageBackdrop} />
            </ButtonBase>
        )
    }

    return (
        <main className={classes.luscherMain}>
            <Modal active={modalActive} setActive={setModalActive}>
                Тест Люшера с высокой степенью достоверности продиагностирует Ваше психофизиологическое состояние, стрессоустойчивость, активность и коммуникативные способности. Процедура тестирования состоит в упорядочивании цветов по степени их субъективной приятности. Тестирование проводится при естественном освещении -
                Вам необходимо отвлечься от ассоциаций, связанных с модой, традициями, общепринятыми вкусами и постараться выбирать цвета только исходя из своего личного отношения.
                Во время прохождения теста Вам необходимо выбрать из предложенных восьми цветов тот, который больше всего нравится. Вы должны выбрать цвет как таковой, не пытаясь соотнести его с любимым цветом в одежде, цветом глаз и т. п. Выберите наиболее приятный цвет из восьми и нажмите на него. После нажатия прямоугольник сменит цвет на белый. Повторяйте эту процедуру до тех пор, пока все прямоугольники не перекрасятся в белый.
            </Modal>
            <div className={classes.mainContent}>
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" color="textPrimary" gutterBottom> Тест Люшера </Typography>
                </Container>
            </div>

            <Container className={classes.root} maxWidth="md">
                <Grid container spacing={9} >
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} >
                            <Card className={classes.card}>
                                <CardActions>
                                    <div className={classes.root}>
                                        {Card1.map((image) => createButton(image, 'first'))}
                                    </div>
                                </CardActions>
                            </Card>
                            <Card className={classes.card}>
                                <Typography variant="h6" align="center" color="#000000" gutterBottom> Перевернем карточку с цветами </Typography>
                                <CardActions>
                                    <div className={classes.root}>
                                        {Card2.map((image) => createButton(image, 'second'))}
                                    </div>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <div className={classes.mainButtons}>
                <Grid container spacing={5} justify="center">
                    <Button variant="contained" color="second" component={RouterLink} to="/finish"> Завершить тестирование </Button>
                    <Button variant="contained" color="second" onClick={() => setModalActive(true)}> Модальное окно </Button>
                </Grid>
            </div>
        </main>
    );
}

export default SecondTest
