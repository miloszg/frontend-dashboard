import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import AuthenticationService from '../../api/dashboard/AuthenticationService.js';
import UserMenuOptionsService from '../../api/dashboard/UserMenuOptionsService.js';
import { FormattedMessage } from 'react-intl';
import {connect} from 'react-redux'
import {setUserLogin,setUserLogout} from '../../redux/actions/userActions'
import {makeSelectLoggedIn} from './selector'
import { createStructuredSelector } from 'reselect'; 

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
});

const mapDispatchToProps = {
  setUserLogin,
  setUserLogout,
};

const MenuFun = props => {
  const isLoggedIn = props.loggedIn;
  let username = AuthenticationService.getUsername();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setState] = React.useState([]);
  
  if (isLoggedIn) {
    UserMenuOptionsService.retrieveAllUserMenuOptions(username)
    .then(response=>response.data.filter(x => x.language===props.locale))
    .then(response => setState(response)) 
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <h4 className="nav-link" onClick={handleClick}>
        <FormattedMessage id="app.tasks.menu" />
      </h4>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isLoggedIn &&
          data.map(v => (
            <MenuItem onClick={handleClose} key={v.id}>
              <Link className="nav-link" to={v.link}>
                {v.menuOption}
              </Link>
            </MenuItem>
          ))}
        {!isLoggedIn ? (
          <MenuItem onClick={handleClose}>
            <Link className="nav-link" to="/login">
              <FormattedMessage id="app.tasks.menu.login" />
            </Link>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link
              className="nav-link"
              to="/logout"
              onClick={() => {AuthenticationService.logout(); props.setUserLogout()}}
            >
              <FormattedMessage id="app.tasks.menu.logout" />
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuFun);