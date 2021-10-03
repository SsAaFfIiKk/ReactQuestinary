import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Sections from "./Sections";
import Home from "./pages/Homepgae"
import About from "./pages/AboutSelf"
import Omoi from "./pages/OmoIns"
import Omo from "./pages/OMO"
import Zasi from "./pages/ZaslonIns"
import Zas from "./pages/Zaslon"
import Vosi from "./pages/VosIns"
import Vos from "./pages/Vospriytie.js"
import Lusheri from "./pages/LusherIns"
import Lusher from "./pages/SecondTest"
import Bigi from './pages/BigIns'
import Big from "./pages/Big5"
import Kompi from "./pages/KompIns"
import Komp from "./pages/Kompetision"
import Interi from "./pages/InterIns"
import Inter from "./pages/Inter"
import "./css/SideMenu.css"

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogout: false,
            tests: {}
        };

        this.signOut = this.signOut.bind(this)
        this.getTestStatus = this.getTestStatus.bind(this)
    }

    componentDidMount() {
        this.getTestStatus()
    }

    componentDidUpdate() {
        const currentPath = this.props.history.location.pathname.split('/').pop()
        const links = Array.from(document.querySelectorAll('.sidenav a'))

        for (let linkIndex in links) {
            const currentEl = links[linkIndex]
            const elLink = currentEl.href.split('/').pop()
            if (elLink === currentPath || elLink.substring(0, elLink.length - 3) === currentPath) {
                links[linkIndex].style.setProperty('background', 'rgba(0,0,0,0.25)', '');
                links[linkIndex].style.setProperty('color', 'rgb(228, 227, 235)', '');
            }
            else {
                links[linkIndex].style.setProperty('background', '', '');
                links[linkIndex].style.setProperty('color', '#FFFFFF', '');
            }
        }
    }

    async getTestStatus() {
        const link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/check_user_tests"
        const res = await fetch(link, {
            method: "POST",
            body: JSON.stringify({
                "id": localStorage.getItem("id"),
            })
        })
        const out = await res.json();
        this.setState({ tests: out });
    }

    signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("surname");
        this.setState({ islogout: true });
    }

    generatePersLinks(match, cn) {
        return (
            <ul>
                <li>
                    <Link className={cn} to={`${match.path}/zaslonins`}>Мои взгляды и интересы</Link>
                </li>
                <li>
                    <Link className={!this.state.tests["zaslon"] ? "inslinkd" : cn} to={`${match.path}/luscherins`}>Мои состояние и особенности</Link>
                </li>
                <li>
                    <Link className={!this.state.tests["luscher"] ? "inslinkd" : cn} to={`${match.path}/bigins`} >Мой характер </Link>
                </li>
            </ul>
        )
    }

    generateTeamLinks(match, cn) {
        return (
            <ul>
                <li>
                    <Link className={!this.state.tests["big5"] ? "inslinkd" : cn} to={`${match.path}/vosins`}>Моя роль в команде</Link>
                </li>
                <li>
                    <Link className={!this.state.tests["self_perception"] ? "inslinkd" : cn} to={`${match.path}/omoins`}>Межличностные отношения</Link>
                </li>
            </ul>
        )
    }

    generateInteres(match, cn) {
        return (
            <ul>
                <li>
                    <Link className={!this.state.tests["omo"] ? "inslinkd" : cn} to={`${match.path}/kompins`}>Мои профессиональные интересы</Link>
                </li>
            </ul>
        )
    }

    generateAbout(match, cn) {
        return (
            <ul>
                <li>
                    <Link className={cn} to={`${match.path}/ank`}>Анкета</Link>
                </li>
            </ul>
        )
    }

    isAllTestsPassed() {
            for (let value of Object.values(this.state.tests)) {
                if (value === 0) {
                    return false
                }
            }
        return true;
    }

    render() {
        if (this.state.islogout) {
            return <Redirect to="/login" />;
        }

        const { match } = this.props;
        return (
            <div className="main-flex">
                <div className="sidenav">
                    <ul>
                        <li>
                            <Link className="single" to={`${match.path}`}> Главная </Link>
                        </li>
                        <li>
                            <Link className="single" to={`${match.path}/personal`}> Определение индивидуальных особенностей</Link>
                            {this.generatePersLinks(match, "inslink")}
                        </li>
                        <li>
                            <Link className="single" to={`${match.path}/team`}> Оценка роли в команде </Link>
                            {this.generateTeamLinks(match, "inslink")}
                        </li>
                        <li>
                            <Link className="single" to={`${match.path}/interes`}>Интересы</Link>
                            {this.generateInteres(match, "inslink")}
                        </li>
                        <li>
                            <Link className="single" to={`${match.path}/about`}> О себе </Link>
                            {this.generateAbout(match, "inslink")}
                        </li>
                        <li>
                            <Link className="inslinkd" to="#">Интервью</Link>
                            {/* <Link className={this.isAllTestsPassed()?'single':'inslinkd'} to={`${match.path}/interins`}>Интервью</Link> */}
                        </li>
                        <li>
                            <Link className="single" to={"/login"} onClick={this.signOut}>Выход</Link>
                        </li>
                    </ul>
                </div>
                <main role="main">
                    <div className="main">
                        <Switch>
                            <Route path={`${match.path}/personal`}>
                                {Sections.personal(this.generatePersLinks(match, "inslink-page"))}
                            </Route>
                            <Route path={`${match.path}/team`}>
                                {Sections.team(this.generateTeamLinks(match, "inslink-page"))}
                            </Route>
                            <Route path={`${match.path}/interes`}>
                                {Sections.interes(this.generateInteres(match, "inslink-page"))}
                            </Route>
                            <Route path={`${match.path}/about`}>
                                {Sections.about(this.generateAbout(match, "inslink-page"))}
                            </Route>
                            <Route path={`${match.path}/bigins`}>
                                <Bigi />
                            </Route>
                            <Route path={`${match.path}/big`}>
                                <Big updateTest={this.getTestStatus} />
                            </Route>
                            <Route path={`${match.path}/omoins`}>
                                <Omoi />
                            </Route>
                            <Route path={`${match.path}/omo`}>
                                <Omo updateTest={this.getTestStatus} />
                            </Route>
                            <Route path={`${match.path}/zaslonins`}>
                                <Zasi />
                            </Route>
                            <Route path={`${match.path}/zaslon`}>
                                <Zas updateTest={this.getTestStatus} />
                            </Route>
                            <Route path={`${match.path}/vosins`}>
                                <Vosi />
                            </Route>
                            <Route path={`${match.path}/vos`}>
                                <Vos updateTest={this.getTestStatus} />
                            </Route>
                            <Route path={`${match.path}/luscherins`}>
                                <Lusheri />
                            </Route>
                            <Route path={`${match.path}/luscher`}>
                                <Lusher updateTest={this.getTestStatus} />
                            </Route>
                            <Route path={`${match.path}/kompins`}>
                                <Kompi />
                            </Route>
                            <Route path={`${match.path}/komp`}>
                                <Komp updateTest={this.getTestStatus} />
                            </Route>
                            {/* <Route path={`${match.path}/interins`}>
                                <Interi />
                            </Route>
                            <Route path={`${match.path}/inter`}>
                                <Inter />
                            </Route> */}
                            <Route path={`${match.path}/ank`}>
                                <About />
                            </Route>
                            <Route exact path={`${match.path}`}>
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(SideMenu);