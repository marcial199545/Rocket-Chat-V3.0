// eslint-disable-next-line
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// NOTE STYLES
import "./App.css";

//NOTE REDUX
import { Provider } from "react-redux";
import store from "./store";
// NOTE COMPONENTS
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import ProfileSettings from "./components/layout/ProfileSettings";
import AddContactForm from "./components/users/AddContactForm";
import AddGroupConversation from "./components/users/AddGroupConversation";
import friendRequests from "./components/notification/FriendRequests";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import Page404 from "./components/layout/Page404";
import { loadUser } from "./actions/auth";

const App = () => {
    useEffect(() => {
        // @ts-ignore
        store.dispatch(loadUser());
    });
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <Alert />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/profile/settings" component={ProfileSettings} />
                        <PrivateRoute exact path="/contact/add" component={AddContactForm} />
                        <PrivateRoute exact path="/group/add" component={AddGroupConversation} />
                        <PrivateRoute exact path="/friendRequests" component={friendRequests} />
                        <Route component={Page404} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
