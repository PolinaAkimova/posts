import React, {useContext, useState, useEffect} from 'react';
import {Button, Form, Grid, Input, Message} from "semantic-ui-react";
import {AuthContext} from "../context";
import {useHistory} from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const router = useHistory();
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [error, setError] = useState(false);
  
  const authorization = (e) => {
    e.preventDefault();
    console.log(login);
    if (login === "Polina") {
      setIsAuth(true);
      localStorage.setItem("auth", login);
      router.push("/posts");
    } else {
      setError(true);
    }
  }
  
  return (
    <Grid centered className="login__container">
      <Grid.Column width={12}>
        <Form onSubmit={authorization} className="login__form">
          <Input className="login__input" value={login} onChange={e => setLogin(e.target.value)}
                 placeholder='Hello! What is your name?'/>
          <Button
            color="teal"
          >
            Submit
          </Button>
        </Form>
        
        {
          error ? <Message negative>
            <Message.Header>Access is denied</Message.Header>
            <p>Incorrect name</p>
          </Message> : null
        }
      </Grid.Column>
    </Grid>
  );
};

export default Login;