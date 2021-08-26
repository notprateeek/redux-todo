import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { makeSelectList } from './selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import { TextField, IconButton } from '@material-ui/core';
import { editTodo, deleteTodo } from './actions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  todo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
  },
});

function Todo(props) {
  const [edit, setEdit] = useState('');
  const [editable, setEditable] = useState(false);

  useInjectReducer({ key: 'todo', reducer });

  const classes = useStyles();

  return (
    <div>
      {!editable ? (
        <div className={classes.todo}>
          <div>{props.todo.text}</div>
          <div>
            <IconButton
              onClick={() => {
                setEdit(props.todo.text);
                setEditable(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => props.dispatch(deleteTodo(props.todo.id))}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className={classes.todo}>
          <div>
            <TextField value={edit} onChange={e => setEdit(e.target.value)} />
          </div>
          <div>
            <IconButton
              onClick={() => {
                props.dispatch(editTodo(props.todo.id, edit));
                setEditable(false);
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton onClick={() => setEditable(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
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

export default compose(withConnect)(Todo);
