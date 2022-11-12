import React, {useState, useEffect, useRef} from 'react';
import {useFetch} from "../hooks/useFetch";
import PostService from "../api/PostService";
import "../styles/Posts.css";
import HeaderComponent from "../components/headerComponent/HeaderComponent";
import PostList from "../components/post/PostList";
import {useObserver} from "../hooks/useObserver";
import {Message} from "semantic-ui-react";

const FETCHING_SIZE = 6;

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const lastElem = useRef();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [fetching, error, loading] = useFetch(() => {
    return PostService.getAll(FETCHING_SIZE, page)
      .then(res => {
        setTotalPages(res.data.totalPages);
        setPostList([...postList, ...res.data.content]);
      });
  });
  
  const addPost = (post) => {
    console.log(postList.length);
    if (postList.length % 6 !== 0) {
      setPostList([...postList, post]);
    } else {
      setTotalPages(totalPages + 1);
    }
  };
  
  useEffect(() => {
    fetching();
    console.log("fetch all posts")
  }, [page]);
  
  useEffect(() => {
    console.log(postList.length)
  }, [postList]);
  
  useObserver(lastElem, page < totalPages - 1, loading, () => {
    setPage(page + 1);
  });
  
  return (
    <div className="post-page">
      <HeaderComponent
        setFilter={setFilter}
        setPostList={addPost}
      />
      {
        <PostList filter={filter} posts={postList}>
          {
            loading ?
              <i className="spinner loading icon huge"/> :
              error ?
                <Message negative>
                  <Message.Header>We're sorry we can't load posts</Message.Header>
                  <p>Something went wrong</p>
                </Message> : null
          }
          <div style={{
            height: 20
          }} ref={lastElem}>{page} {totalPages}</div>
        </PostList>
      }
    </div>
  );
};

export default Posts;
