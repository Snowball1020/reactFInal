import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home';

import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Tours from './tours/Index';
import NewTour from './tours/New';
import EditTour from './tours/Edit';
import { Fragment } from "react";

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" render={
        renderProps => <Home
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/register" render={
        renderProps => <Register
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      
      {
        /*
          Tricked you!
          The routes have been completed to provide a better user experience.
          HOWEVER!!!

          In your own words, please explain what is happening in the logic below.
          ANSWER HERE:

          -- I will take below code as example

          <Route exact path="/tours" render={
            props => user ? (
              <Tours {...props} user={user} />
            ) : (
              <Redirect to="/"/>
            )
          }/>


          Route exact path = "/tours" defines the path to a particular component.
          here when hit /tours , <Tours> component will be rendered

          user ? ( ) means
          if user data is not null, that means there is a logged in user now
          so it passes the user data to <Tours> so that any data inside it
          can be used in <Tours> too.

          {user} means that user data that contains any data that is set by setUser

          {...props} means recieving and passing whatever passed as props 
          to this component and send it to Chile component <Tours> too

          : ( ) means
          if user is null, that means no logged in user so
          it loads home page instad of going to render <Tour>Component
          
        */
      }
      <Route exact path="/tours" render={
        props => user ? (
          <Tours {...props} user={user} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
      <Route exact path="/tours/new" render={
        props => user ? (
          <NewTour {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
      <Route exact path="/tours/edit" render={
        props => user ? (
          <EditTour {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
    </Switch>
  );
}

export default Routes;