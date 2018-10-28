//Packages
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Redux
import { Provider } from 'react-redux';
import store from './store';

//Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//Styling
import './App.css';
import blue from '@material-ui/core/colors/blue';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: blue
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      },
      contained: {
        color: 'white'
      }
    },
    MuiTableCell: {
      head: {
        fontSize: '1.25rem'
      },
      body: {
        fontSize: '1rem'
      }
    }
  }
});

//Check for token
if (localStorage.getItem('jwtToken')) {
  setAuthToken(localStorage.getItem('jwtToken'));

  const decoded = jwt_decode(localStorage.getItem('jwtToken'));

  store.dispatch(setCurrentUser(decoded));

  //Check for expiredToken
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());

    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
              <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <div className="container">
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profiles" component={Profiles} />
                  <Route exact path="/profile/:handle" component={Profile} />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/create-profile"
                      component={CreateProfile}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/edit-profile"
                      component={EditProfile}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/add-experience"
                      component={AddExperience}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/add-education"
                      component={AddEducation}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/feed" component={Posts} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/post/:id" component={Post} />
                  </Switch>
                  <Route exact path="/not-found" component={NotFound} />
                </div>
                <Footer />
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
