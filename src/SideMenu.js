import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import About from "./pages/AboutSelf"
import Omoi from "./pages/OmoIns"
import Omo from "./pages/OMO"
import Zasi from "./pages/ZaslonIns"
import Zas from "./pages/Zaslon"
import Vosi from "./pages/VosIns"
import Vos from "./pages/Vospriytie.js"
import Lusheri from "./pages/LusherIns"
import Lusher from "./pages/SecondTest"
import Kompi from "./pages/KompIns"
import Komp from "./pages/Kompetision"
import Inter from "./pages/InterIns"
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
                            <Link to={`${match.path}`}>Главная</Link>
                        </li>
                        <li>
                            Определение индивидуальных особенностей
                            <ul>
                                <li>
                                    <Link to={`${match.path}/zaslonins`}>Тест на определение личных интересов</Link>
                                </li>
                                <li>
                                    <Link to={`${match.path}/luscherins`} style={this.state.tests["zaslon"] ? null : { pointerEvents: "none" }}>Тестирование “Тест Люшера”</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Команда
                            <ul>
                                <li>
                                    <Link to={`${match.path}/vosins`} style={this.state.tests["luscher"] ? null : { pointerEvents: "none" }}>Опрос самовосприятия</Link>
                                </li>
                                <li>
                                    <Link to={`${match.path}/omoins`} style={this.state.tests["self_perception"] ? null : { pointerEvents: "none" }}>Опрос межличностных орентаций</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Профессиональные интересоы
                            <ul>
                                <li>

                                    <Link to={`${match.path}/kompins`} style={this.state.tests["omo"] ? null : { pointerEvents: "none" }}>Мои профессиональные интересы</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to={`${match.path}/inter`}>Интервью</Link>
                        </li>
                        <li>
                            <button onClick={this.signOut}>Выход</button>
                        </li>
                    </ul>
                </div>
                <main role="main">
                    <div className="main">
                        <Switch>
                            <Route path={`${match.path}/omoins`}>
                                <Omoi />
                            </Route>
                            <Route path={`${match.path}/omo`}>
                                <Omo updateTest={this.getTestStatus}/>
                            </Route>
                            <Route path={`${match.path}/zaslonins`}>
                                <Zasi />
                            </Route>
                            <Route path={`${match.path}/zaslon`}>
                                <Zas updateTest={this.getTestStatus}/>
                            </Route>
                            <Route path={`${match.path}/vosins`}>
                                <Vosi />
                            </Route>
                            <Route path={`${match.path}/vos`}>
                                <Vos updateTest={this.getTestStatus}/>
                            </Route>
                            <Route path={`${match.path}/luscherins`}>
                                <Lusheri />
                            </Route>
                            <Route path={`${match.path}/luscher`}>
                                <Lusher updateTest={this.getTestStatus}/>
                            </Route>
                            <Route path={`${match.path}/kompins`}>
                                <Kompi />
                            </Route>
                            <Route path={`${match.path}/komp`}>
                                <Komp updateTest={this.getTestStatus}/>
                            </Route>
                            <Route path={`${match.path}/inter`}>
                                <Inter/>
                            </Route>
                            <Route exact path={`${match.path}`}>
                                <About />
                            </Route>
                        </Switch>
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(SideMenu);