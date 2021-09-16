import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import About from "./pages/AboutSelf"
import Omo from "./pages/OMO"
import Vos from "./pages/Vospriytie.js"
// import Inter from "./pages/InterInstruction"
import "./css/SideMenu.css"
import exit from "./img/logout.png"

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogout: false
        };
    }

    signOut = () => {
        localStorage.removeItem("token");
        this.setState({
            islogout: true
        });
    };

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
                            <Link to={`${match.path}/omo`}>Опрос межличностных орентаций</Link>
                        </li>
                        <li>
                            <Link to={`${match.path}/zaslon`}>Заслон</Link>
                        </li>
                        <li>
                            <Link to={`${match.path}/self`}>Опрос самовосприятия</Link>
                        </li>
                        <li>
                            <Link to={`${match.path}/lusher`}>Тест Люшера</Link>
                        </li>
                        <li>
                            <Link to={`${match.path}/komp`}>Тест на компетенции</Link>
                        </li>
                        {/* <li>
                            <Link to={`${match.path}/inter`}>Интервью</Link>
                        </li> */}
                        <li>
                            <button onClick={this.signOut}><img src={exit} alt="Выход" /> Выход</button>
                        </li>
                    </ul>
                </div>
                <main role="main">
                    <div className="main">
                        <Switch>
                            <Route path={`${match.path}/omo`}>
                                <Omo />
                            </Route>
                            <Route path={`${match.path}/zaslon`}>
                                Заслон
                            </Route>
                            <Route path={`${match.path}/self`}>
                                <Vos />
                            </Route>
                            <Route path={`${match.path}/lusher`}>
                                lusher
                            </Route>
                            <Route path={`${match.path}/komp`}>
                                Компетенции
                            </Route>
                            {/* <Route path={`${match.path}/inter`}>
                                <Inter />
                            </Route> */}
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