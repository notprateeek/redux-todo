/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { makeSelectList } from './selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import { addTodo } from './actions';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/styles';
import Todo from './todo';

const useStyles = makeStyles({
  container: { display: 'grid', placeItems: 'center' },
  form: { display: 'flex', gap: '2em', margin: '2em 0' },
});

function HomePage(props) {
  const [input, setInput] = useState('');

  useInjectReducer({ key: 'todo', reducer });

  function handleTodo(input) {
    let todo = {
      id: uuidv4(),
      text: input,
    };
    props.dispatch(addTodo(todo));
    setInput('');
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
          <Todo key={uuidv4()} todo={todo} />
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
