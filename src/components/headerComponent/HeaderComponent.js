import React, {useState} from "react";
import cl from "./HeaderComponent.module.css";
import {Image, Input} from 'semantic-ui-react';
import avatar from "../../assets/avatar.jpg";
import ModalComponent from "../modalComponent/ModalComponent";
import PostService from "../../api/PostService";

function HeaderComponent({setFilter, setPostList, postsLen}) {
  const [post, setPost] = useState({
    title: "",
    description: "",
    text: "",
  });
  
  const fetchCallback = () => {
    return PostService.create(post)
      .then(() => {
        setPost({
          title: "",
          description: "",
          text: "",
        });
        setPostList({
          ...post,
          created_at: new Date(),
          id: new Date(),
        });
      });
  };
  
  return (
    <div className={cl.headerComponent}>
      <div>
        <Image src={avatar} className={cl.avatar} size="small" circular/>
        
        <ModalComponent
          trigger={
            <div className={cl.icon}>
              <i className="circular large inverted teal pencil alternate icon"/>
            </div>
          }
          setPost={setPost}
          post={post}
          callback={fetchCallback}
          title="Add new post"
        />
      </div>
      
      <Input className={cl.input} placeholder='Search...' onChange={e => setFilter(e.target.value)}/>
    </div>
  )
}

export default HeaderComponent;