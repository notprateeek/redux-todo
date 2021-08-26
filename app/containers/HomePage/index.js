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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  container: { display: 'grid', placeItems: 'center' },
  form: { display: 'flex', gap: '2em', margin: '2em 0' },
});

function HomePage(props) {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState(props.list);

  useInjectReducer({ key: 'todo', reducer });

  function handleTodo(input) {
    let todo = {
      id: uuidv4(),
      text: input,
    };
    props.dispatch(addTodo(todo));
    setInput('');
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedTodos] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedTodos);

    setTodos(items);
  }

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <h1>todo app</h1>
      <div className={classes.form}>
        <TextField value={input} onChange={e => setInput(e.target.value)} />
        <Button onClick={() => handleTodo(input)}>add todo</Button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {provided => (
            <div
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable key={uuidv4()} draggableId={todo.id} index={index}>
                  {provided => (
                    <Todo
                      todo={todo}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
