import React, {useContext} from 'react';
import {AuthContext} from "../context";
import {Grid} from "semantic-ui-react";
import {Redirect, Route, Switch} from "react-router-dom";
import Posts from "../pages/Posts";
import PostDetail from "../pages/PostDetail";
import Error from "../pages/Error";
import Login from "../pages/Login";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  
  if (isLoading) {
    return (
      <Grid centered>
        <Grid.Column width={2}>
          <i className="spinner loading icon huge"/>
        </Grid.Column>
      </Grid>
    )
  }
  
  return (
    isAuth ?
      <Switch>
        <Route exact path="/posts">
          <Posts/>
        </Route>
        <Route exact path="/posts/:id">
          <PostDetail/>
        </Route>
        <Error/>
        <Redirect to="/error"/>
      </Switch> :
      <Switch>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Redirect to="/login"/>
      </Switch>
  );
};

export default AppRouter;