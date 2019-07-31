import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {makeSelectLoggedIn} from './selector'
import { createStructuredSelector } from 'reselect'; 

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
});

class AuthenticatedRoute extends Component {
  render() {
    if(this.props.loggedIn){
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
  )
)(AuthenticatedRoute);

