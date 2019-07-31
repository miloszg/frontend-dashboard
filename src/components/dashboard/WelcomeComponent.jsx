import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../../api/dashboard/AuthenticationService.js';
import { FormattedMessage } from 'react-intl';

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: AuthenticationService.getUsername()
    };
  }


  render() {
    return (
      <div className="container">
          <h1>
            <FormattedMessage id="app.welcome" />
          </h1>
          <h1>{this.state.username}</h1>
          <Link to="/tasks" className="nav-link link">
              <FormattedMessage id="app.welcome.link" />
          </Link>
        </div>   
    );
  }
}

export default WelcomeComponent
