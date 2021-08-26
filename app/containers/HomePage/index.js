/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { Container, TextField, Button, IconButton } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { makeSelectList } from './selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import { addTodo } from './actions';
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: { display: 'grid', placeItems: 'center' },
  form: { display: 'flex', gap: '2em', margin: '2em 0' },
  todo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
  },
});

function HomePage(props) {
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState();
  const [editable, setEditable] = useState(false);

  useInjectReducer({ key: 'todo', reducer });

  function handleTodo(input) {
    let todo = {
      id: uuidv4(),
      text: input,
    };
    props.dispatch(addTodo(todo));
    setInput('');
  }

  function editTodo(id, value) {
    const index = props.list.findIndex(todo => todo.id == id);
    props.list[index].text = value;
    setEditable(false);
  }

  function deleteTodo(id) {
    props.list.filter(todo => todo.id !== id);
  }

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <h1>todo app</h1>
      <div className={classes.form}>
        <TextField value={input} onChange={e => setInput(e.target.value)} />
        <Button onClick={() => handleTodo(input)}>add todo</Button>
      </div>
      <div className="list">
        {props.list.map(todo => (
          <div key={uuidv4()}>
            {!editable ? (
              <div className={classes.todo}>
                <div>{todo.text}</div>
                <div>
                  <IconButton
                    onClick={() => {
                      setEdit(todo.text);
                      setEditable(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteTodo(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className={classes.todo}>
                <div>
                  <TextField
                    value={edit}
                    onChange={e => setEdit(e.target.value)}
                  />
                </div>
                <div>
                  <IconButton onClick={() => editTodo(todo.id, edit)}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditable(false)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
