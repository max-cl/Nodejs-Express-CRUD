import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Login from './components/Login';
import Home from './components/Home';
import TodoDetail from './components/TodoDetail';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import NotFound from './components/NotFound';

// Private Route
import { PrivateRoute } from './PrivateRoute';

// Store
import { store } from './redux';

//Action
import { loadUser } from './redux/actions/auth.action';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }


  render(){
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/resetpassword/:token" component={ResetPassword} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/tododetail/:id" component={TodoDetail} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;