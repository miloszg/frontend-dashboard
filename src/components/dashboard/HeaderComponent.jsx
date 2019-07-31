import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Menu from './MenuComponent';
class HeaderComponent extends Component {
  render() {
    return (
      <header>   
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <h2>
              <a href="https://www.vemco.pl" className="navbar-brand">
                Vemco
              </a>
            </h2>
          </div>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            <Menu locale={this.props.locale}/>
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(HeaderComponent);
