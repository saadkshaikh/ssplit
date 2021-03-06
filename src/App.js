import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

//pages
import Homepage from './pages/Homepage/Homepage';
import LoginPage from './pages/Login/Login'
import InfoPage from './pages/InfoPage/InfoPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NewSubscription from './pages/NewSubscription/NewSubscription';
import GetSubscriptionPage from './pages/GetSubscriptionPage/GetSubscriptionPage';
import ConfirmSharer from './pages/ConfirmSharer/ConfirmSharer';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import { auth } from './firebase/firebase.utils';
import { getUser } from './api/user.api';
import './App.scss';
const App = ({ setCurrentUser, currentUser }) => {


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const user = await getUser(userAuth.email)
        setCurrentUser({...user})
      }
      else {
        setCurrentUser(userAuth);
        console.log('when the user is logging out, or no userAuth', userAuth);
      }
    });
    return () => unsubscribe();
  }, [setCurrentUser]);

  return (
    <div>
      <Switch>
        <Route exact path='/' component={currentUser ? Dashboard : Homepage}/>
        <Route exact path='/signup' component={LoginPage}/>
        <Route exact path='/info' component={InfoPage}/>
        <Route exact path='/new' component={currentUser ? NewSubscription : Homepage}/>
        <Route exact path='/new/:planID' component={GetSubscriptionPage}/>
        <Route exact path='/join/:planID' component={ConfirmSharer}/>
      </Switch>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
