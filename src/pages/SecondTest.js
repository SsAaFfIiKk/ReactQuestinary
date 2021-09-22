import React, { useState, useEffect } from 'react';
import { CardActions, Container, Typography, Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import Instructions from '../Instructions';

const useStyles = makeStyles((theme) => ({
    luscherMain: {
        flexGrow: 1,
        marginLeft: 160
    },
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
    },
    mainContent: {
        marginTop: theme.spacing(12),
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

let sesion;
async function getSesion() {
    const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
    if (!sesion) {
        await fetch(ses_link, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": "luscher"
            })
        })
            .then(res => res.json())
            .then(out => sesion = out)
    }
}

async function sendData(props) {
    const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/start_lusher_interpritation"
    const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_luscher"

    const data = {
        "answers": answers,
        "session_id": sesion,
        "type": "luscher"
    };
    
    const body = {
        method: 'POST',
        body: JSON.stringify(data)
    };

    await fetch(save_link, body)
    await fetch(iter_link, {
        method: "POST",
        body: JSON.stringify({ "session_id": sesion })
    })
    props.updateTest()
}

let answers = { first: [], second: [] }

function SecondTest(props) {
    answers = { first: [], second: [] }
    sesion = undefined
    useEffect(() => { getSesion() })

    function handleClick(item, answerType, props) {
        if (!answers[answerType].includes(item.namecolor)) {
            answers[answerType].push(item.namecolor);
        }

        if (answers[answerType].length === 8) {
            document.getElementById("1").hidden = true
            document.getElementById("2").hidden = false
        }

        if (answers["first"].length === 8 && answers["second"].length === 8) {
            document.getElementById("1").hidden = true
            document.getElementById("2").hidden = true
            setEndActive(true)
            sendData(props)
        }
    }

    const classes = useStyles();
    const [modalActive, setModalActive] = useState(false)
    const [modalEnd, setEndActive] = useState(false)

    function createButton(image, answerType) {
        return (
            <ButtonBase focusRipple key={image.namecolor}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{ width: image.width, }}
                onClick={(event) => {
                    handleClick(image, answerType, props);
                    const buttonToFuckUp = event.target.tagName === 'BUTTON' ? event.target : event.target.parentNode;
                    event.target.style.backgroundColor = '#ffffff';
                    buttonToFuckUp.style.cursor = 'auto';
                    buttonToFuckUp.disabled = true
                    buttonToFuckUp.innerHTML = ''
                }}
            >
                <span className={classes.imageSrc}
                    style={{ backgroundColor: image.color, }} />
                <span className={classes.imageBackdrop} />
            </ButtonBase>
        )
    }
    
    return (
        <div>
            <button className="insbutton" onClick={() => setModalActive(true)}> Инструкция</button>
            <Modal active={modalActive} setActive={setModalActive} notClosable={false}>
                {Instructions.luscjerIns()}
            </Modal>
            <Modal id="end" active={modalEnd} setActive={setEndActive} notClosable={true}>
                <p>Спасибо за прохождение теста. Теперь вам доступен тест "Мой характер".</p>
                <Link to="/menu"> <button>На главную</button></Link>
                <Link to='./bigins'><button>Следующий тест</button></Link>
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
                            <Card id="1" className={classes.card}>
                                <CardActions>
                                    <div className={classes.root}>
                                        {Card1.map((image) => createButton(image, 'first'))}
                                    </div>
                                </CardActions>
                            </Card>
                            <Card id="2" className={classes.card} hidden>
                                <Typography variant="h6" align="center" color="#000000" gutterBottom> Второй набор карточек</Typography>
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
        </div>
    );
}

export default SecondTest
