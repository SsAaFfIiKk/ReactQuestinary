import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import About from "./pages/AboutSelf"
import Omo from "./pages/OMO"

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
            <div>
                <ul>
                    <li>
                        <Link to={`${match.path}`}>Главная</Link>
                    </li>
                    <li>
                        <Link to={`${match.path}/omo`}>Опрос межличностных орентаций</Link>
                    </li>
                    <li>
                        <Link to={`${match.path}/lusher`}>Тест Люшера</Link>
                    </li>
                    <li className="push-right">
                        <button onClick={this.signOut} href="#">
                            Выйти
                        </button>
                    </li>
                </ul>
                <main role="main">
                    <div className="main">
                        <Switch>
                            <Route path={`${match.path}/omo`}>
                                <Omo />
                            </Route>
                            <Route path={`${match.path}/lusher`}>
                                lusher
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