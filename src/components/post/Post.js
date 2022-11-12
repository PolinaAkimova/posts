import React from 'react';
import {useHistory} from "react-router-dom";
import {PostCard} from "posts_libr";

const Post = ({postItem}) => {
  const router = useHistory();
  const changePath = () => {
    router.push(`/posts/${postItem.id}`);
  }
  
  return (
    <PostCard callback={changePath}>
      <h2>{postItem.title}</h2>
      <h3>{postItem.description}</h3>
    </PostCard>
  );
};

export default Post;