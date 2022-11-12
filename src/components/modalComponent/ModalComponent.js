import React, {useState, useEffect} from 'react';
import {Button, Header, Modal, Input, TextArea, Form, Message} from 'semantic-ui-react';
import cl from "./ModalComponent.module.css";
import {useFetch} from "../../hooks/useFetch";

const ModalComponent = ({trigger, title, setPost, callback, post}) => {
  const [open, setOpen] = useState(false);
  const [fetching, error, loading] = useFetch(callback);
  const [success, setSuccess] = useState(false);
  const [validate, setValidate] = useState({
    title: true,
    description: true,
  });
  
  const changePost = (key, e) => {
    setPost({
      ...post,
      [key]: e.target.value,
    });
  }
  
  // мб убрать стоппропаг
  const addPost = async (e) => {
    e.stopPropagation();
    await fetching();
    setSuccess(true);
  };
  
  useEffect(() => {
    setValidate({
      title: post.title !== undefined && post.title.length !== 0,
      description: post.description !== undefined && post.description.length !== 0,
    })
  }, [post]);
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
      size="tiny"
    >
      {
        success && !error && !loading ?
          <h4 className={cl.successMsg}>Successfully submitted!</h4> : null
      }
      <Modal.Content>
        {
          loading ?
            <div className="spinner-container">
              <i className="spinner loading icon huge"/>
            </div> :
            error ?
              <Message negative>
                <Message.Header>We're sorry we can't send request</Message.Header>
                <p>Something went wrong</p>
              </Message> :
              <Modal.Description>
                <Header>{title}</Header>
                <Form>
                  <Input
                    error={!validate.title}
                    value={post.title}
                    onChange={e => changePost("title", e)}
                    className={cl.input}
                    focus
                    placeholder={validate.title ? 'Empty field' : 'Title'}
                  />
                  <Input
                    error={!validate.description}
                    value={post.description}
                    onChange={e => changePost("description", e)}
                    className={cl.input}
                    focus
                    placeholder={validate.title ? 'Empty field' : 'Description'}
                  />
                  <TextArea value={post.text} onChange={e => changePost("text", e)} placeholder='Tell us more'/>
                </Form>
              </Modal.Description>
        }
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          onClick={addPost}
          color="teal"
          disabled={error || loading || !validate.description || !validate.title}
        >
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalComponent;