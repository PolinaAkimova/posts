import React from "react";
import {Grid} from "semantic-ui-react";
import Post from "./Post";
import {usePosts} from "../../hooks/usePosts";

const PostList = ({filter, posts, children}) => {
  const filteredPosts = usePosts(posts, filter);
  
  return (
    <div className="post-list">
      <Grid columns={3}>
        {
          filteredPosts.map(p =>
            <Grid.Column key={p.id}>
              <Post postItem={p}/>
            </Grid.Column>
          )
        }
      </Grid>
      {children}
    </div>
  );
};

export default PostList;