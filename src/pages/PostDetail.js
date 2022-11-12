import React, {useState, useEffect} from 'react';
import {useFetch} from "../hooks/useFetch";
import PostService from "../api/PostService";
import {useHistory, useParams} from "react-router-dom";
import {Grid, GridColumn, Header, Image, Message} from "semantic-ui-react";
import avatar from "../assets/avatar.jpg";
import "../styles/postDetail.css";
import ModalComponent from "../components/modalComponent/ModalComponent";

const PostDetail = () => {
  const router = useHistory();
  const params = useParams();
  
  const [post, setPost] = useState({});
  const [fetching, error, loading] = useFetch(() => {
    return PostService.getById(params.id)
      .then(res => {
        setPost(res.data);
      });
  });
  
  const fetchCallback = () => {
    return PostService.update(post, params.id);
  };
  
  const [deleteFetching, deleteError, deleteLoading] = useFetch(() => {
    return PostService.delete(params.id)
      .then(() => router.push("/posts"));
  });
  
  useEffect(fetching, []);
  
  return (
    <div className="post-detail">
      <div className="post-detail__header">
        <Grid columns={2} centered>
          <GridColumn width={2}>
            <Image src={avatar} className="post-detail__avatar" circular/>
          </GridColumn>
          <GridColumn width={8}>
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
          </GridColumn>
          <GridColumn width={2} className="post-detail__icons">
            <ModalComponent
              trigger={
                <div className="post-detail__icon-field">
                  <i className="edit outline icon big"/>
                </div>
              }
              setPost={setPost}
              post={post}
              callback={fetchCallback}
              title="Edit post"
            />
            
            <div className="post-detail__icon-field" onClick={deleteFetching}>
              <i className="trash alternate outline icon big"/>
            </div>
          </GridColumn>
        </Grid>
      </div>
      {
        deleteError ?
          <Grid className="post-detail__text" centered>
            <Grid.Column width={12}>
              <Message negative>
                <Message.Header>We're sorry we can't delete this post</Message.Header>
                <p>Something went wrong</p>
              </Message>
            </Grid.Column>
          </Grid> :
          deleteLoading ?
            <i className="spinner loading icon huge"/> : null
      }
      
      <Grid className="post-detail__text" centered>
        {
          loading ?
            <Grid.Column width={2}>
              <i className="spinner loading icon huge"/>
            </Grid.Column> :
            <Grid.Column width={12}>
              {post.text}
            </Grid.Column>
        }
      </Grid>
    </div>
  );
};

export default PostDetail;