import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import ListComponent from './ListComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import TaskComponent from './TaskComponent';

class DashboardApp extends Component {
  render() {
    return (
      <div className="LoginApp">
        <Router>
          <>
            <HeaderComponent locale={this.props.locale}/>
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute
                path="/welcome"
                component={WelcomeComponent}
              />
              <AuthenticatedRoute path="/tasks/:id" component={TaskComponent} />
              <AuthenticatedRoute path="/tasks" component={ListComponent} />
              <AuthenticatedRoute path="/logout" />
              <Route component={ErrorComponent} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default DashboardApp;
