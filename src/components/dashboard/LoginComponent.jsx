import React, { Component } from 'react';
import AuthenticationService from '../../api/dashboard/AuthenticationService.js';
import { FormattedMessage } from 'react-intl';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {setUserLogin} from '../../redux/actions/userActions'

const mapDispatchToProps = {
  setUserLogin,
};

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: 'admin',
      hasLoginFailed: false,
      showSuccessMessage: false
    };
  }
 

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  loginClicked = () => {
    AuthenticationService.executeBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
        this.props.setUserLogin()
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  };

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="app.tasks.menu.login" />
        </h1>
        <div className="container">
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">
              <FormattedMessage id="app.login.invalid" />
            </div>
          )}
          {this.state.showSuccessMessage && (
            <div>
              <FormattedMessage id="app.login.successful" />
            </div>
          )}
          <FormattedMessage id="app.login.username" />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <FormattedMessage id="app.login.password" />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-success" onClick={this.loginClicked}>
            <FormattedMessage id="app.tasks.menu.login" />
          </button>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  )
)(LoginComponent);
