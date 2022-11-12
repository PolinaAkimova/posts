import React from 'react';
import {Grid, Message} from "semantic-ui-react";
import {Link} from "react-router-dom"

const Error = () => {
  return (
    <Grid centered style={{
      paddingTop: "50px"
    }}>
      <Grid.Column width={12}>
        <Message negative>
          <Message.Header>404</Message.Header>
          <p>Something went wrong <Link to="/login">Maybe you want to authorize?</Link></p>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Error;