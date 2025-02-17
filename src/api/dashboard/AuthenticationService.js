import axios from 'axios';

class AuthenticationService {
  executeBasicAuthenticationService(username, password) {
    return axios.get('http://localhost:9000/basicauth', {
      headers: { authorization: this.createBasicAuthToken(username, password) }
    });
  }
  
  createBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem('authenticatedUser', username);
    this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');

  }

  isLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }

  getUsername() {
    let user = sessionStorage.getItem('authenticatedUser');
    if (user === null) return '';
    return user;
  }

  setupAxiosInterceptors(basicAuthHeader) {
    axios.interceptors.request.use(config => {
      if (this.isLoggedIn()) {
        config.headers.authorization = basicAuthHeader;
      }
      return config;
    });
  }
}

export default new AuthenticationService()
